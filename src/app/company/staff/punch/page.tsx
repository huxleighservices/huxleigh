'use client';
import { PunchForm } from './PunchForm';

export default function TimePunchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Time Punch</h1>
      <p className="text-muted-foreground">
        Select your punch type, add any notes, and submit.
      </p>
      <div className="max-w-md">
        <PunchForm />
      </div>
    </div>
  );
}
