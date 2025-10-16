'use client';

import { useState } from 'react';
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

export function EnterpriseActivationForm() {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await submitEnterpriseForm(null, formData);

      if (result.success) {
        toast({
          title: 'Success!',
          description: result.message,
        });
        e.currentTarget.reset();
        setSelectedOrganization('');
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
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-violet-600 hover:bg-violet-700 font-bold"
          >
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}