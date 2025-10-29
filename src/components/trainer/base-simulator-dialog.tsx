'use client';
import { useState, useTransition, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TrainingMessage, TrainingResult, TrainingFeedback } from "@/types/auth";
import { runTrainerFlow } from "@/ai/flows/trainer-flow";
import { useAuth } from "@/contexts/AuthContext";
import { addResultToSession } from "@/lib/firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";

interface BaseSimulatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phase: 'prospecting' | 'qualification' | 'discovery' | 'proposal' | 'objection-handling' | 'closing' | 'cold-call';
  title: string;
  description: string;
  activeSessionId: string | null;
}

export function BaseSimulatorDialog({ open, onOpenChange, phase, title, description, activeSessionId }: BaseSimulatorDialogProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [conversation, setConversation] = useState<TrainingMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<TrainingFeedback | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const userTurnCount = conversation.filter(m => m.role === 'user').length;

  useEffect(() => {
    if(scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({top: scrollAreaRef.current.scrollHeight, behavior: 'smooth'});
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newUserMessage: TrainingMessage = { role: 'user', content: userInput };
    const updatedConversation = [...conversation, newUserMessage];
    setConversation(updatedConversation);
    setUserInput('');

    startTransition(async () => {
      try {
        const result = await runTrainerFlow({
          phase,
          difficulty,
          conversationHistory: conversation, // Pass the conversation before the user's new message
          userMessage: userInput
        });
        
        const fullConversationForSaving = [...updatedConversation];
        
        // Handle conversational turn
        if (result.aiResponse) {
          const aiMessage: TrainingMessage = { role: 'ai', content: result.aiResponse };
          setConversation(prev => [...prev, aiMessage]);
          fullConversationForSaving.push(aiMessage);
        }

        // Handle final turn with feedback
        if (result.feedback && currentUser && activeSessionId) {
            // Validate that feedback has all required properties
            if (!result.feedback.overallAssessment || 
                !result.feedback.positivePoints || 
                !result.feedback.areasForImprovement) {
                throw new Error('Incomplete feedback received');
            }
            
            const trainingResult: Omit<TrainingResult, 'id' | 'completedAt'> = {
                phase,
                difficulty,
                conversation: fullConversationForSaving,
                feedback: result.feedback,
            };
            await addResultToSession(currentUser.uid, activeSessionId, trainingResult);
            toast({
                title: "Session Complete!",
                description: "Your results and feedback have been saved."
            });
            setIsComplete(true);
            setFeedback(result.feedback);
        }

      } catch (error: any) {
        toast({
          title: "AI Error",
          description: error.message || "The AI is not available right now. Please try again later.",
          variant: "destructive",
        });
        // Restore user input if AI fails
        setUserInput(userInput);
        setConversation(conversation);
      }
    });
  };
  
  const resetAndClose = () => {
    setConversation([]);
    setUserInput('');
    setDifficulty('Beginner');
    setIsComplete(false);
    setFeedback(null);
    onOpenChange(false);
  }

  const renderSimulationContent = () => (
     <>
        <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Difficulty:</label>
            <Select value={difficulty} onValueChange={(val: 'Beginner' | 'Intermediate' | 'Advanced') => setDifficulty(val)} disabled={conversation.length > 0}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
            </Select>
            <div className="ml-auto text-sm text-muted-foreground">
                Prompt {userTurnCount + 1} of 5
            </div>
        </div>

        <ScrollArea className="flex-1 border rounded-md p-4 bg-muted/20" ref={scrollAreaRef}>
          <div className="space-y-4">
            {conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
             {isPending && <div className="flex justify-start"><div className="p-3 rounded-lg bg-card"><Loader2 className="h-5 w-5 animate-spin"/></div></div>}
          </div>
        </ScrollArea>
        
        <div className="flex items-center gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            disabled={isPending}
          />
          <Button onClick={handleSendMessage} disabled={isPending || !userInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
    </>
  );

  const renderFeedbackContent = () => (
    <div className="flex-1 flex flex-col">
        <DialogHeader className="mb-4">
            <DialogTitle>Simulation Complete: Feedback</DialogTitle>
            <DialogDescription>Here is the AI's assessment of your performance.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1">
            <Card className="bg-muted/20">
                <CardContent className="p-6 space-y-4">
                    <div>
                        <h4 className="font-semibold text-lg mb-1">Overall Assessment</h4>
                        <p className="text-muted-foreground">{feedback?.overallAssessment}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1">What Went Well</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {feedback?.positivePoints.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg mb-1">Areas for Improvement</h4>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            {feedback?.areasForImprovement.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </ScrollArea>
    </div>
  );


  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) resetAndClose(); else onOpenChange(true); }}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col">
       {!isComplete && (
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description} You will have 5 prompts to complete the simulation.
          </DialogDescription>
        </DialogHeader>
       )}
        
        {isComplete ? renderFeedbackContent() : renderSimulationContent() }

        <DialogFooter className="mt-4">
            <Button variant="outline" onClick={resetAndClose}>
                {isComplete ? 'Finish Review' : 'End Simulation'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
