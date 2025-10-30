'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitPunch } from './actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const initialState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Punch
    </Button>
  );
}

export function PunchForm() {
  const { userProfile } = useAuth();
  const [state, formAction] = useFormState(submitPunch, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: 'Punch Submitted!',
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <input
        type="hidden"
        name="userName"
        value={userProfile?.displayName || 'Unknown User'}
      />
      <input
        type="hidden"
        name="userEmail"
        value={userProfile?.email || 'Unknown Email'}
      />
      <div className="space-y-2">
        <Label>Punch Type</Label>
        <RadioGroup
          name="punchType"
          defaultValue="in"
          className="flex gap-4"
          required
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in" id="in" />
            <Label htmlFor="in">Punch In</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="out" id="out" />
            <Label htmlFor="out">Punch Out</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="context">Context / Notes (Optional)</Label>
        <Textarea
          id="context"
          name="context"
          placeholder="e.g., Starting work on the new feature."
          rows={4}
        />
      </div>
      <SubmitButton />
    </form>
  );
}
