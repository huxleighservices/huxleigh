'use client';

import React, { useMemo, useState, useTransition } from 'react';
import { format, startOfWeek } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { TimePunch } from '@/types/auth';
import { deleteTimePunches } from '@/lib/firebase/firestore';
import { sendTimecards } from './actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Mail, Trash2 } from 'lucide-react';

interface GroupedPunches {
  [weekId: string]: {
    punches: TimePunch[];
    weekOf: Date;
    totalHours: number;
    punchIds: string[];
  };
}

interface WeeklyTimeCardData {
  weekId: string;
  weekOf: Date;
  totalHours: number;
  punches: TimePunch[];
  punchIds: string[];
}

const calculateHours = (punches: TimePunch[]) => {
  let totalMillis = 0;
  let inTime: number | null = null;
  const sortedPunches = [...punches].sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());

  sortedPunches.forEach(punch => {
    if (punch.type === 'in' && inTime === null) {
      inTime = punch.timestamp.toMillis();
    } else if (punch.type === 'out' && inTime !== null) {
      totalMillis += punch.timestamp.toMillis() - inTime;
      inTime = null;
    }
  });

  return totalMillis / (1000 * 60 * 60);
};

interface TimeCardListProps {
  timePunches: TimePunch[];
  isLoading?: boolean;
}

export function TimeCardList({ timePunches, isLoading }: TimeCardListProps) {
  const { currentUser, userProfile } = useAuth();
  const { toast } = useToast();
  const [selectedWeeks, setSelectedWeeks] = useState<Set<string>>(new Set());
  const [isDeleting, startDeleteTransition] = useTransition();
  const [isEmailing, startEmailTransition] = useTransition();

  const weeklyTimeCards: WeeklyTimeCardData[] = useMemo(() => {
    const grouped = timePunches.reduce((acc: GroupedPunches, punch) => {
      const { weekId } = punch;
      if (!acc[weekId]) {
        const punchDate = punch.timestamp.toDate();
        acc[weekId] = {
          weekOf: startOfWeek(punchDate, { weekStartsOn: 1 }),
          punches: [],
          totalHours: 0,
          punchIds: [],
        };
      }
      acc[weekId].punches.push(punch);
      acc[weekId].punchIds.push(punch.id);
      return acc;
    }, {});

    Object.values(grouped).forEach(week => {
      week.totalHours = calculateHours(week.punches);
    });
    
    return Object.entries(grouped)
        .map(([weekId, data]) => ({ weekId, ...data }))
        .sort((a, b) => b.weekOf.getTime() - a.weekOf.getTime());

  }, [timePunches]);

  const handleSelectWeek = (weekId: string, checked: boolean | 'indeterminate') => {
    setSelectedWeeks(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(weekId);
      } else {
        newSet.delete(weekId);
      }
      return newSet;
    });
  };

  const handleDelete = () => {
    if (!currentUser || selectedWeeks.size === 0) return;

    startDeleteTransition(async () => {
        const punchIdsToDelete = weeklyTimeCards
            .filter(week => selectedWeeks.has(week.weekId))
            .flatMap(week => week.punchIds);
        
        try {
            await deleteTimePunches(currentUser.uid, punchIdsToDelete);
            toast({
                title: 'Success',
                description: 'Selected timecards have been deleted.',
            });
            setSelectedWeeks(new Set());
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Deletion Failed',
                description: error.message || 'An error occurred.',
            });
        }
    });
  };

  const handleEmail = () => {
    if (selectedWeeks.size === 0 || !userProfile) return;

    startEmailTransition(async () => {
        const timecardsToSend = weeklyTimeCards.filter(week => selectedWeeks.has(week.weekId));
        const result = await sendTimecards(userProfile, timecardsToSend);
         if (result.success) {
            toast({
                title: 'Email Sent',
                description: result.message,
            });
            setSelectedWeeks(new Set());
        } else {
            toast({
                variant: 'destructive',
                title: 'Email Failed',
                description: result.message,
            });
        }
    });
  };

  // ✅ NO EARLY RETURNS - render conditionally within JSX
  return (
    <div className="space-y-4">
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : weeklyTimeCards.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No time punches recorded yet.</p>
      ) : (
        <>
          <div className="flex justify-end gap-2 mb-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={selectedWeeks.size === 0 || isDeleting}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedWeeks.size})
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete {selectedWeeks.size} selected week(s) of time punches. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Yes, delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button onClick={handleEmail} disabled={selectedWeeks.size === 0 || isEmailing}>
              {isEmailing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Mail className="mr-2 h-4 w-4" />}
              Email Selected ({selectedWeeks.size})
            </Button>
          </div>

          {weeklyTimeCards.map(({ weekId, weekOf, totalHours, punches }) => (
            <Card key={weekId}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={`select-week-${weekId}`}
                    checked={selectedWeeks.has(weekId)}
                    onCheckedChange={(checked) => handleSelectWeek(weekId, checked)}
                    aria-label={`Select week of ${format(weekOf, 'MMMM d, yyyy')}`}
                  />
                  <div>
                    <CardTitle>Week of {format(weekOf, 'MMMM d, yyyy')}</CardTitle>
                    <CardDescription>
                      Total Hours: {totalHours.toFixed(2)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {punches.map(punch => (
                        <TableRow key={punch.id}>
                          <TableCell>
                            <span className={`font-semibold ${punch.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                              {punch.type.toUpperCase()}
                            </span>
                          </TableCell>
                          <TableCell>{format(punch.timestamp.toDate(), 'eee, MMM d')}</TableCell>
                          <TableCell>{format(punch.timestamp.toDate(), 'h:mm:ss a')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}