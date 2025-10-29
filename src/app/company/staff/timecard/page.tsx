
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { TimeClockCard } from './TimeClockCard';
import { TimeCardList } from './TimeCardList';
import type { TimePunch } from '@/types/auth';

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

  const {
    data: timePunches,
    isLoading: isPunchesLoading,
    error,
  } = useCollection<TimePunch>(timePunchesQuery);

  const isLoading = isAuthLoading || isPunchesLoading;

  if (!currentUser && !isAuthLoading) {
      return null;
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-destructive">Error loading timecard data.</p>
      </div>
    );
  }
  
  const lastPunch = timePunches && timePunches.length > 0 ? timePunches[0] : null;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Timecard</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full overflow-hidden">
        <div className="lg:col-span-1">
          <TimeClockCard lastPunch={lastPunch} currentUser={currentUser} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2 h-full overflow-y-auto pr-2">
            {isLoading ? (
                 <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            ) : (
                <TimeCardList timePunches={timePunches ?? []} />
            )}
        </div>
      </div>
    </div>
  );
}
