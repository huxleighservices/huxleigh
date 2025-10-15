'use client';

import { useState, useActionState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { submitEnterpriseForm } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useFormStatus } from 'react-dom';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-violet-600 hover:bg-violet-700 font-bold"
    >
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit
    </Button>
  );
}

export function EnterpriseActivationForm() {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [state, formAction] = useActionState(submitEnterpriseForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
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
    <div className="w-full max-w-md">
      <div className="space-y-2 mb-8">
        <Label htmlFor="enterprise-organization">Enterprise Organization</Label>
        <Select
          onValueChange={(value) => setSelectedOrganization(value)}
          value={selectedOrganization}
        >
          <SelectTrigger id="enterprise-organization">
            <SelectValue placeholder="Select an enterprise organization..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Planet Euphoria Records">
              Planet Euphoria Records
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedOrganization && (
        <form action={formAction} className="space-y-6 text-left">
           <input type="hidden" name="enterpriseOrganization" value={selectedOrganization} />
          <div className="space-y-2">
            <Label htmlFor="legalName">Legal Name</Label>
            <Input id="legalName" name="legalName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stageName">Stage Name</Label>
            <Input id="stageName" name="stageName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail Address</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <SubmitButton />
        </form>
      )}
    </div>
  );
}
