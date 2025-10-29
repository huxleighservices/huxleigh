
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { TimePunch } from '@/types/auth';
import { TimeClockCard } from './TimeClockCard';
import { TimeCardList } from './TimeCardList';

export default function TimecardPage() {
  const { currentUser, loading: isAuthLoading } = useAuth();
  const firestore = useFirestore();

  const timePunchesQuery = useMemoFirebase(() => {
    if (!firestore || !currentUser) return null;
    return query(
      collection(firestore, 'users', currentUser.uid, 'timePunches'),
      orderBy('timestamp', 'desc')
    );
  }, [firestore, currentUser]);

  const lastPunchQuery = useMemoFirebase(() => {
    if (!firestore || !currentUser) return null;
    return query(
      collection(firestore, 'users', currentUser.uid, 'timePunches'),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
  }, [firestore, currentUser]);

  const {
    data: timePunches,
    isLoading: isPunchesLoading,
    error: punchesError,
  } = useCollection<TimePunch>(timePunchesQuery);
  
  const {
    data: lastPunchResult,
    isLoading: isLastPunchLoading,
    error: lastPunchError,
  } = useCollection<TimePunch>(lastPunchQuery);

  const lastPunch = lastPunchResult && lastPunchResult.length > 0 ? lastPunchResult[0] : null;

  const isLoading = isAuthLoading || isPunchesLoading || isLastPunchLoading;
  const error = punchesError || lastPunchError;

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-destructive">Error loading timecard data.</p>
      </div>
    );
  }

  // This check ensures currentUser is available before rendering the main content.
  // It also prevents rendering during the initial auth loading phase.
  if (isAuthLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!currentUser) {
    // This case should be handled by the StaffLayout, but it's a good safeguard.
    return null; 
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Timecard</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full overflow-hidden">
        <div className="lg:col-span-1">
          <TimeClockCard 
            isLoading={isLoading} 
            lastPunch={lastPunch}
            currentUser={currentUser}
          />
        </div>
        <div className="lg:col-span-2 h-full overflow-y-auto pr-2">
          <TimeCardList 
            isLoading={isLoading} 
            timePunches={timePunches || []} 
          />
        </div>
      </div>
    </div>
  );
}
