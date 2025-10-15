
'use client';

import { useState, FormEvent, useEffect, useTransition } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCollection, useMemoFirebase } from '@/firebase';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Plus, Loader2, KeyRound, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { createHyperlink } from '@/lib/firebase/firestore';
import type { Hyperlink } from '@/types/auth';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import Link from 'next/link';

const CREATE_PASSCODE = 'aldous';

function CreateHyperlinkDialog() {
  const { userProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === CREATE_PASSCODE) {
      setIsAuthenticated(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Incorrect Passcode',
        description: 'The passcode you entered is incorrect.',
      });
    }
  };

  const handleCreateSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !url || !userProfile) {
      toast({
        variant: 'destructive',
        title: 'Creation Failed',
        description: 'Title and URL are required.',
      });
      return;
    }

    startTransition(async () => {
      try {
        await createHyperlink(userProfile.uid, title, url);
        toast({
          title: 'Success!',
          description: `Hyperlink "${title}" has been created.`,
        });
        resetAndClose();
      } catch (error) {
        // The detailed error is now being thrown by the `createHyperlink` function
        // and emitted globally. We can show a generic toast here, but the developer
        // will see the detailed error in the Next.js overlay.
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'You do not have permission to create a hyperlink. Check the console for details.',
        });
      }
    });
  };

  const resetAndClose = () => {
    setIsOpen(false);
    setPasscode('');
    setIsAuthenticated(false);
    setTitle('');
    setUrl('');
  };

  if (!userProfile) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetAndClose();
        else setIsOpen(true);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Hyperlink
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Hyperlink</DialogTitle>
          <DialogDescription>
            {isAuthenticated
              ? 'Enter a title and URL for the new hyperlink button.'
              : 'Enter the passcode to create a new hyperlink.'}
          </DialogDescription>
        </DialogHeader>

        {!isAuthenticated ? (
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passcode">Passcode</Label>
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-muted-foreground" />
                <Input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Authenticate</Button>
            </DialogFooter>
          </form>
        ) : (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Company Handbook"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/handbook"
                required
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function HyperlinkList() {
    const firestore = useFirestore();

    const hyperlinksQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'hyperlinks'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: hyperlinks, isLoading, error } = useCollection<Hyperlink>(hyperlinksQuery);

    if (isLoading) {
        return <div className="flex justify-center items-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>;
    }

    if (error) {
        return <p className="text-center text-destructive py-8">Error loading hyperlinks.</p>
    }

    if (!hyperlinks || hyperlinks.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No hyperlinks have been created yet.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hyperlinks.map(link => (
                <Button key={link.id} asChild variant="outline" className="justify-start h-auto py-3">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4 mr-3 shrink-0"/>
                        <span className="flex-1 text-left truncate">{link.title}</span>
                        <ExternalLink className="h-4 w-4 ml-2 text-muted-foreground"/>
                    </Link>
                </Button>
            ))}
        </div>
    );
}


export default function ResourcesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Resources</h1>
        <CreateHyperlinkDialog />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>Company Hyperlinks</span>
          </CardTitle>
          <CardDescription>
            Important links and resources for all staff members.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <HyperlinkList />
        </CardContent>
      </Card>
    </div>
  );
}
