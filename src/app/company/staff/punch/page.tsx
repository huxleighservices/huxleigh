'use client';
import { PunchForm } from './PunchForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


export default function TimePunchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Time Punch</h1>
      <p className="text-muted-foreground max-w-md">
        Select your punch type, add any notes, and submit. Your record will be emailed to administration.
      </p>
      <Card className="max-w-md glassmorphism">
        <CardHeader>
            <CardTitle>New Time Punch</CardTitle>
        </CardHeader>
        <CardContent>
            <PunchForm />
        </CardContent>
      </Card>
    </div>
  );
}
