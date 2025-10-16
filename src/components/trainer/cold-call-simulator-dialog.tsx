
'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mic, Square, AlertTriangle, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { transcribeAudio } from "@/ai/flows/transcribe-audio-flow";
import { runCallSimulation } from "@/ai/flows/call-simulation-flow";
import { useAuth } from "@/contexts/AuthContext";
import { addResultToSession } from "@/lib/firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

import type { CallSimulationInput, SimulationOutput } from '@/types/trainer';

interface ColdCallSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSessionId: string | null;
}

type Persona = CallSimulationInput['persona'];
type ConversationMessage = { role: 'user' | 'assistant'; text: string; audioUrl?: string };

const personaOptions = {
    role: ['C-Suite Executive', 'Receptionist', 'Technology Purchaser', 'New Hire', 'Middle Management'],
    attitude: ['Friendly', 'Skeptical', 'Busy', 'Hostile'],
    qualification: ['Good Fit', 'Bad Fit', 'Unsure'],
};

export function ColdCallSimulatorDialog({ open, onOpenChange, activeSessionId }: ColdCallSimulatorDialogProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isProcessing, startTransition] = useTransition();

  // Simulation State
  const [isStarted, setIsStarted] = useState(false);
  const [persona, setPersona] = useState<Persona>({
    role: 'Middle Management',
    gender: 'Male',
    attitude: 'Busy',
    qualification: 'Unsure',
  });
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<SimulationOutput['feedback'] | null>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const resetState = useCallback(() => {
    setIsStarted(false);
    setConversation([]);
    setIsRecording(false);
    setAudioBlob(null);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsComplete(false);
    setFeedback(null);
    onOpenChange(false);
  }, [onOpenChange]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({top: scrollAreaRef.current.scrollHeight, behavior: 'smooth'});
    }
  }, [conversation]);

  useEffect(() => {
    // Auto-play AI response audio when it becomes available
    const lastMessage = conversation[conversation.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.audioUrl && audioRef.current) {
        audioRef.current.src = lastMessage.audioUrl;
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
  }, [conversation]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        processAudio(blob);
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        variant: "destructive",
        title: "Microphone Error",
        description: "Could not access microphone. Please check your browser permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const processAudio = (blob: Blob) => {
    startTransition(async () => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          
          // 1. Transcribe audio
          const { text: transcribedText } = await transcribeAudio(base64Audio);
          const userMessage: ConversationMessage = { role: 'user', text: transcribedText };
          const updatedConversation = [...conversation, userMessage];
          setConversation(updatedConversation);

          // 2. Get AI response
          const simulationInput: CallSimulationInput = {
            persona,
            conversationHistory: updatedConversation.map(({role, text}) => ({role: role === 'user' ? 'user' : 'assistant', text})),
          };
          const result = await runCallSimulation(simulationInput);

          // 3. Update conversation with AI response
          if (result.response && result.audioUrl) {
              const aiMessage: ConversationMessage = { role: 'assistant', text: result.response, audioUrl: result.audioUrl };
              setConversation(prev => [...prev, aiMessage]);
          }

          // 4. Handle completion and save results
          if (result.isComplete && result.feedback) {
              setIsComplete(true);
              setFeedback(result.feedback);
              if (currentUser && activeSessionId) {
                  const resultToSave = {
                      phase: 'Cold Call',
                      difficulty: persona.attitude, // or derive from multiple factors
                      conversation: updatedConversation.map(m => ({role: m.role, content: m.text})),
                      feedback: result.feedback,
                  };
                  await addResultToSession(currentUser.uid, activeSessionId, resultToSave);
                  toast({
                      title: "Session Complete!",
                      description: "Your results and feedback have been saved."
                  });
              }
          }
        };
      } catch (error: any) {
        console.error("Error during simulation step:", error);
        toast({
          variant: "destructive",
          title: "AI Simulation Error",
          description: error.message || "An unexpected error occurred.",
        });
      }
    });
  };

  const renderContent = () => {
    if (isComplete && feedback) {
        return (
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-4 text-center">Simulation Complete: Feedback</h3>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <h4 className="font-semibold">Overall Assessment</h4>
                            <p className="text-muted-foreground">{feedback.overallAssessment}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">What Went Well</h4>
                            <ul className="list-disc pl-5 text-muted-foreground">
                                {feedback.positivePoints.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Areas for Improvement</h4>
                            <ul className="list-disc pl-5 text-muted-foreground">
                                {feedback.areasForImprovement.map((point, i) => <li key={i}>{point}</li>)}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (!isStarted) {
      return (
        <div className="p-4 space-y-6">
            <h3 className="text-lg font-semibold text-center">Configure AI Persona</h3>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="role-select">Role</Label>
                    <Select value={persona.role} onValueChange={(v) => setPersona(p => ({...p, role: v as Persona['role']}))}>
                        <SelectTrigger id="role-select"><SelectValue /></SelectTrigger>
                        <SelectContent>{personaOptions.role.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="gender-select">Gender</Label>
                    <Select value={persona.gender} onValueChange={(v) => setPersona(p => ({...p, gender: v as Persona['gender']}))}>
                        <SelectTrigger id="gender-select"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="attitude-select">Attitude</Label>
                    <Select value={persona.attitude} onValueChange={(v) => setPersona(p => ({...p, attitude: v as Persona['attitude']}))}>
                        <SelectTrigger id="attitude-select"><SelectValue /></SelectTrigger>
                        <SelectContent>{personaOptions.attitude.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div>
                    <Label htmlFor="qualification-select">Qualification</Label>
                    <Select value={persona.qualification} onValueChange={(v) => setPersona(p => ({...p, qualification: v as Persona['qualification']}))}>
                        <SelectTrigger id="qualification-select"><SelectValue /></SelectTrigger>
                        <SelectContent>{personaOptions.qualification.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>
            <Button className="w-full" onClick={() => setIsStarted(true)}>Start Simulation</Button>
        </div>
      );
    }
    
    return (
      <>
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-2 px-1">
            <h4 className="text-sm font-semibold">Live Call Simulation</h4>
            <div className="flex gap-2">
                <Badge variant="secondary">{persona.role}</Badge>
                <Badge variant="outline">{persona.attitude}</Badge>
            </div>
          </div>
          <ScrollArea className="flex-1 border rounded-md p-4 bg-muted/20" ref={scrollAreaRef}>
            <div className="space-y-4">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                    <p className="text-sm">{msg.text}</p>
                    {msg.role === 'assistant' && msg.audioUrl && (
                        <Button variant="ghost" size="sm" className="mt-2" onClick={() => {
                            if(audioRef.current) {
                                audioRef.current.src = msg.audioUrl!;
                                audioRef.current.play();
                            }
                        }}>
                            <Play className="h-4 w-4 mr-2"/> Listen
                        </Button>
                    )}
                  </div>
                </div>
              ))}
               {isProcessing && <div className="flex justify-start"><div className="p-3 rounded-lg bg-card"><Loader2 className="h-5 w-5 animate-spin"/></div></div>}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center justify-center pt-4">
          <Button
            size="lg"
            className={`rounded-full h-20 w-20 transition-all duration-300 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            {isRecording ? <Square className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </Button>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetState(); else onOpenChange(true); }}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Cold Call Simulator</DialogTitle>
          <DialogDescription>
            Practice your real-time sales calls. The AI will respond with voice. Speak into your microphone to reply.
          </DialogDescription>
        </DialogHeader>
        
        {renderContent()}
        
        <DialogFooter className="mt-auto">
            <Button variant="outline" onClick={resetState}>
                {isComplete ? 'Close' : 'End Simulation'}
            </Button>
        </DialogFooter>
        <audio ref={audioRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
