
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Loader2 } from 'lucide-react';
import type { AuthError } from 'firebase/auth';

export default function StaffPage() {
  const { userProfile, currentUser, loading, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName);
    }
  }, [userProfile]);

  if (loading || !userProfile || !currentUser) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (displayName.length < 2) {
          toast({
              title: "Error",
              description: "Display name must be at least 2 characters.",
              variant: "destructive"
          });
          return;
      }

      setIsSubmitting(true);
      const result = await updateUserProfile({ displayName }, { displayName });

      if (result && 'code' in result) { // It's an AuthError
          toast({
              title: "Error",
              description: (result as AuthError).message || "An unexpected error occurred.",
              variant: "destructive"
          });
      } else {
          toast({
              title: "Success",
              description: "Profile updated successfully!",
          });
      }
      setIsSubmitting(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Info</h1>

      <Card className="max-w-2xl border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{userProfile.displayName}</CardTitle>
              <CardDescription className="text-primary font-semibold">
                Staff Member
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="userId" value={currentUser.uid} />
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>
             <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
