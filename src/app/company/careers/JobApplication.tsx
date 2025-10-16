'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { submitApplication } from './actions';

type FormState = {
  message: string;
  errors: Record<string, string[]> | null;
  success: boolean;
};

export function JobApplication({ jobTitle }: { jobTitle: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState<FormState>({
    message: '',
    errors: null,
    success: false,
  });
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await submitApplication(null, formData);

      setState(result);

      if (result.success) {
        toast({
          title: 'Application Sent!',
          description: result.message,
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Please fill out the form below to submit your application.
          </DialogDescription>
        </DialogHeader>
        {state.success ? (
          <div className="py-8 text-center">
            <h3 className="text-xl font-semibold">Thank You!</h3>
            <p className="text-muted-foreground mt-2">{state.message}</p>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <input type="hidden" name="jobTitle" value={jobTitle} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>
            {state.errors?.name && (
              <p className="text-sm text-destructive col-start-2 col-span-3">
                {state.errors.name[0]}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="col-span-3"
                required
              />
            </div>
            {state.errors?.email && (
              <p className="text-sm text-destructive col-start-2 col-span-3">
                {state.errors.email[0]}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input id="phone" name="phone" type="tel" className="col-span-3" />
            </div>
            {state.errors?.phone && (
              <p className="text-sm text-destructive col-start-2 col-span-3">
                {state.errors.phone[0]}
              </p>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume/CV
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                className="col-span-3"
                required
                accept=".pdf,.doc,.docx"
              />
            </div>
            {state.errors?.resume && (
              <p className="text-sm text-destructive col-start-2 col-span-3">
                {state.errors.resume[0]}
              </p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}