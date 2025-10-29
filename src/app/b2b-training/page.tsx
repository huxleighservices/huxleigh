'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Lock, BrainCircuit, Search, UserCheck, Microscope, FileText, MessageCircleQuestion, Goal, PlusCircle, Trash2, Mail, ChevronsRight, Loader2, PhoneCall } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ProspectingSimulatorDialog } from '@/components/trainer/prospecting-simulator-dialog';
import { QualificationSimulatorDialog } from '@/components/trainer/qualification-simulator-dialog';
import { DiscoverySimulatorDialog } from '@/components/trainer/discovery-simulator-dialog';
import { ProposalSimulatorDialog } from '@/components/trainer/proposal-simulator-dialog';
import { ObjectionHandlingDialog } from '@/components/trainer/objection-handling-dialog';
import { ClosingSimulatorDialog } from '@/components/trainer/closing-simulator-dialog';
import { ColdCallSimulatorDialog } from '@/components/trainer/cold-call-simulator-dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { onSessionsUpdate, addTrainingSession, deleteTrainingSession, deleteResultFromSession } from '@/lib/firebase/firestore';
import { sendSessionByEmail } from './actions';
import type { TrainingSession } from '@/types/auth';
import { format } from 'date-fns';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const trainingPhases = [
  {
    id: "prospecting",
    title: "Phase 1: Prospecting",
    description: "Learn to identify and find potential clients.",
    icon: Search,
    status: "Active"
  },
  {
    id: "qualification",
    title: "Phase 2: Qualification",
    description: "Determine if a lead is a good fit for our services.",
    icon: UserCheck,
    status: "Active"
  },
  {
    id: "discovery",
    title: "Phase 3: Discovery",
    description: "Understand a prospect's needs and pain points.",
    icon: Microscope,
    status: "Active"
  },
  {
    id: "proposal",
    title: "Phase 4: Proposal & Value",
    description: "Craft and deliver compelling proposals that justify value.",
    icon: FileText,
    status: "Active"
  },
  {
    id: "objection-handling",
    title: "Phase 5: Objection Handling",
    description: "Address and overcome customer concerns.",
    icon: MessageCircleQuestion,
    status: "Active"
  },
  {
    id: "closing",
    title: "Phase 6: Closing",
    description: "Master the art of closing the deal.",
    icon: Goal,
    status: "Active"
  },
  {
    id: "cold-call",
    title: "Cold Call Simulator",
    description: "Practice making unsolicited calls to prospective clients.",
    icon: PhoneCall,
    status: "Active"
  }
];


export default function TrainerPage() {
  const { currentUser, userProfile, loading } = useAuth();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isEmailing, setIsEmailing] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const unsubscribe = onSessionsUpdate(currentUser.uid, (fetchedSessions) => {
        setSessions(fetchedSessions);
        if (fetchedSessions.length > 0 && !selectedSessionId) {
            setSelectedSessionId(fetchedSessions[0].id);
        } else if (fetchedSessions.length === 0) {
            setSelectedSessionId(null);
        }
    });
    return () => unsubscribe();
  }, [currentUser, selectedSessionId]);

  const handleCreateSession = async () => {
    if (!currentUser || !newSessionName.trim()) return;
    try {
        const newId = await addTrainingSession(currentUser.uid, newSessionName.trim());
        setSelectedSessionId(newId);
        toast({ title: "Session Created", description: `You are now saving results to "${newSessionName.trim()}".`});
        setIsNewSessionDialogOpen(false);
        setNewSessionName('');
    } catch (error: any) {
        toast({ title: 'Error', description: 'Could not create session.', variant: 'destructive' });
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
      if (!currentUser) return;
      await deleteTrainingSession(currentUser.uid, sessionId);
      toast({ title: "Session Deleted", variant: "destructive" });
  };
  
  const handleDeleteResult = async (sessionId: string, resultId: string) => {
      if (!currentUser) return;
      await deleteResultFromSession(currentUser.uid, sessionId, resultId);
      toast({ title: "Result Deleted", description: "The training result has been removed from this session.", variant: "destructive"});
  };

  const handleSendEmail = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentUser || !selectedSessionId || !emailRecipient) return;
      const session = sessions.find(s => s.id === selectedSessionId);
      if (!session) return;
      setIsEmailing(true);
      try {
        const result = await sendSessionByEmail({
            session: session,
            recipientEmail: emailRecipient,
            userName: userProfile?.displayName || currentUser.email!,
        });

        if (result.success) {
            toast({ title: "Session Sent!", description: `An email has been sent to ${emailRecipient}.`});
            setEmailRecipient('');
        } else {
            throw new Error(result.message);
        }
      } catch (error: any) {
        toast({ title: 'Email Failed', description: error.message || 'Could not send the session email.', variant: 'destructive' });
      } finally {
        setIsEmailing(false);
      }
  };

  const selectedSession = sessions.find(s => s.id === selectedSessionId);

  const handleCardClick = (phaseId: string) => {
    // For logged-out users, they can start a simulation, but progress won't be saved.
    // The activeSessionId will be null for them.
    if (currentUser && sessions.length === 0) {
        toast({ title: "No Session Selected", description: "Please create a session before starting a training module.", variant: "destructive"});
        return;
    }
    if (currentUser && !selectedSessionId) {
        toast({ title: "No Session Selected", description: "Please select a session to save your results to.", variant: "destructive"});
        return;
    }
    setOpenDialog(phaseId);
  };
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 h-full overflow-y-auto pr-4">
      <div className="text-center">
        <h1 className="text-4xl font-headline flex items-center justify-center gap-3">
          <BrainCircuit className="h-10 w-10 text-primary"/>
          Tr/AI/ner Platform
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Hone your sales and outreach skills with our AI-powered training modules. Select a phase below to begin your training session.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {trainingPhases.map((phase) => {
          const Icon = phase.icon;
          const isActive = phase.status === 'Active';
          return (
            <Card key={phase.title} className="bg-card/50 flex flex-col group hover:border-primary/50 transition-colors duration-300">
              <CardHeader className="flex-grow">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <CardTitle className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-primary" />
                            {phase.title}
                        </CardTitle>
                        <CardDescription className="mt-2">{phase.description}</CardDescription>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled={!isActive} onClick={() => isActive && handleCardClick(phase.id)}>
                    {isActive ? 'Begin Training' : 'Coming Soon'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!currentUser ? (
         <Alert>
          <Lock className="h-4 w-4" />
          <AlertTitle>You are not signed in!</AlertTitle>
          <AlertDescription>
            Your training progress will not be saved. Sign in or create an account to save and track your sessions.
          </AlertDescription>
        </Alert>
      ) : (
       <Card className="bg-card/50">
        <CardHeader>
          <CardTitle>Your Training Sessions</CardTitle>
          <CardDescription>
            Create or select a session to save your training results. You can review, export, or delete sessions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Label>Active Session:</Label>
            <Select onValueChange={setSelectedSessionId} value={selectedSessionId || ''} disabled={sessions.length === 0}>
              <SelectTrigger className="w-[280px] bg-background/70">
                <SelectValue placeholder="No sessions available" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
              </SelectContent>
            </Select>
             <Dialog open={isNewSessionDialogOpen} onOpenChange={setIsNewSessionDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/> New Session</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New Session</DialogTitle>
                        <DialogDescription>Give this training session a name (e.g., "Q3 Sales Training").</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2">
                        <Label htmlFor="session-name">Session Name</Label>
                        <Input id="session-name" value={newSessionName} onChange={e => setNewSessionName(e.target.value)} placeholder="e.g., 'Q3 Sales Training'" className="bg-background/70"/>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewSessionDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateSession} disabled={!newSessionName.trim()}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {selectedSession && (
                 <Button variant="destructive" size="icon" onClick={() => handleDeleteSession(selectedSession.id)}>
                    <Trash2 className="h-4 w-4"/>
                    <span className="sr-only">Delete session {selectedSession.name}</span>
                </Button>
            )}
          </div>
          
          {selectedSession ? (
            <div className="p-4 border rounded-lg bg-muted/30">
                <h3 className="font-semibold text-lg mb-4">Results for "{selectedSession.name}"</h3>
                <form onSubmit={handleSendEmail} className="flex items-center gap-2 mb-4 p-3 border rounded-md bg-background/50">
                    <Input 
                        type="email" 
                        placeholder="recipient@example.com" 
                        value={emailRecipient}
                        onChange={e => setEmailRecipient(e.target.value)}
                        className="bg-background/70"
                        required
                    />
                    <Button type="submit" disabled={isEmailing}>
                        {isEmailing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Mail className="mr-2 h-4 w-4"/>}
                        Email Session
                    </Button>
                </form>

                {selectedSession.results && selectedSession.results.length > 0 ? (
                    <Accordion type="multiple" className="space-y-2">
                        {selectedSession.results.map((result) => (
                             <AccordionItem key={result.id} value={result.id} className="bg-background/50 rounded-lg border-b-0">
                                <AccordionTrigger className="p-4 hover:no-underline">
                                    <div className="flex justify-between items-center w-full">
                                        <span className="font-semibold flex items-center gap-2">
                                            <ChevronsRight className="h-4 w-4 text-primary"/>
                                            {result.phase} - {result.difficulty}
                                        </span>
                                        <span className="text-xs text-muted-foreground mr-4">
                                            {result.completedAt.toDate ? format(result.completedAt.toDate(), 'MMM d, yyyy - p') : 'Just now'}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-4 pt-0">
                                   <div className="space-y-4">
                                       <div className="space-y-2">
                                            <h4 className="font-semibold">Conversation</h4>
                                            <div className="p-2 bg-muted/40 rounded-md max-h-48 overflow-y-auto text-xs space-y-2">
                                                {result.conversation.map((msg, i) => (
                                                    <p key={i}><strong>{msg.role === 'user' ? 'You' : 'AI'}:</strong> {msg.content}</p>
                                                ))}
                                            </div>
                                       </div>
                                       <div className="space-y-2">
                                            <h4 className="font-semibold">Feedback</h4>
                                            <div className="p-2 bg-muted/40 rounded-md text-xs space-y-2">
                                                <p><strong>Assessment:</strong> {result.feedback?.overallAssessment}</p>
                                                <p><strong>Positives:</strong> {result.feedback?.positivePoints.join(', ')}</p>
                                                <p><strong>Improvements:</strong> {result.feedback?.areasForImprovement.join(', ')}</p>
                                            </div>
                                       </div>
                                       <Button size="sm" variant="destructive" onClick={() => handleDeleteResult(selectedSession.id, result.id)}>
                                           <Trash2 className="h-3 w-3 mr-2"/> Delete Result
                                       </Button>
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-center text-muted-foreground py-4">No results saved to this session yet.</p>
                )}
            </div>
          ) : (
              <div className="text-center text-muted-foreground p-8">
                {sessions.length > 0 ? "Select a session to view its results." : "Create your first session to get started."}
              </div>
          )}
        </CardContent>
      </Card>
      )}


      <ProspectingSimulatorDialog
        open={openDialog === 'prospecting'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
      <QualificationSimulatorDialog
        open={openDialog === 'qualification'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
      <DiscoverySimulatorDialog
        open={openDialog === 'discovery'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
      <ProposalSimulatorDialog
        open={openDialog === 'proposal'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
      <ObjectionHandlingDialog
        open={openDialog === 'objection-handling'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
      <ClosingSimulatorDialog
        open={openDialog === 'closing'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
       <ColdCallSimulatorDialog
        open={openDialog === 'cold-call'}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
        activeSessionId={currentUser ? selectedSessionId : null}
      />
    </div>
  );
}
