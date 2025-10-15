'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full font-bold">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Message
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: 'Message Sent!',
        description: state.message,
      });
    } else if (state.message && state.errors) {
       toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);


  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
          {state.errors?.name && (
            <p className="text-sm text-destructive">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required />
           {state.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email[0]}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" placeholder="Inquiry about AI Solutions" required />
         {state.errors?.subject && (
            <p className="text-sm text-destructive">{state.errors.subject[0]}</p>
          )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Please describe your inquiry in detail..."
          rows={5}
          required
        />
         {state.errors?.message && (
            <p className="text-sm text-destructive">{state.errors.message[0]}</p>
          )}
      </div>
      <SubmitButton />
    </form>
  );
}
