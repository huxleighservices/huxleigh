
'use client';
import { useState, useTransition } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { createTimePunch } from '@/lib/firebase/firestore';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn, LogOut, Clock } from 'lucide-react';
import type { TimePunch } from '@/types/auth';

interface TimeClockCardProps {
  lastPunch: TimePunch | null;
}

export function TimeClockCard({ lastPunch }: TimeClockCardProps) {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handlePunch = (type: 'in' | 'out') => {
    if (!currentUser) return;
    startTransition(async () => {
      try {
        await createTimePunch(currentUser.uid, type);
        toast({
          title: 'Success!',
          description: `You have successfully punched ${type}.`,
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Punch Failed',
          description: error.message || 'An unexpected error occurred.',
        });
      }
    });
  };

  const isPunchedIn = lastPunch?.type === 'in';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Clock</CardTitle>
        <CardDescription>Punch in and out to track your hours.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <div
          className={`flex h-24 w-24 items-center justify-center rounded-full ${
            isPunchedIn ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
          }`}
        >
          <Clock className="h-12 w-12" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">{isPunchedIn ? 'Punched In' : 'Punched Out'}</p>
          {lastPunch?.timestamp && (
            <p className="text-sm text-muted-foreground">
              Since {lastPunch.timestamp.toDate().toLocaleString()}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button
          onClick={() => handlePunch('in')}
          disabled={isPending || isPunchedIn}
          variant={isPunchedIn ? 'secondary' : 'default'}
        >
          {isPending && !isPunchedIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
          Punch In
        </Button>
        <Button
          onClick={() => handlePunch('out')}
          disabled={isPending || !isPunchedIn}
          variant={!isPunchedIn ? 'secondary' : 'destructive'}
        >
          {isPending && isPunchedIn ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
          Punch Out
        </Button>
      </CardFooter>
    </Card>
  );
}
