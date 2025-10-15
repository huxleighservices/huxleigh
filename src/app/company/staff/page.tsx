'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, User as UserIcon } from 'lucide-react';

const profileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required.'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function MyInfoCard() {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        displayName: userProfile.displayName || '',
      });
    }
  }, [userProfile, form]);

  const onSubmit = (data: ProfileFormValues) => {
    if (!currentUser || !userProfile) return;

    startTransition(async () => {
      const authData = {
        displayName: data.displayName !== currentUser.displayName ? data.displayName : undefined,
      };
      const profileData = {
        displayName: data.displayName !== userProfile.displayName ? data.displayName : undefined,
        displayName_lowercase: data.displayName !== userProfile.displayName ? data.displayName.toLowerCase() : undefined,
      };

      // Filter out undefined values
      const filteredAuthData = Object.fromEntries(Object.entries(authData).filter(([_, v]) => v !== undefined));
      const filteredProfileData = Object.fromEntries(Object.entries(profileData).filter(([_, v]) => v !== undefined));
      
      if (Object.keys(filteredAuthData).length === 0 && Object.keys(filteredProfileData).length === 0) {
        toast({ title: 'No Changes', description: 'You have not made any changes.' });
        return;
      }
      
      const error = await updateUserProfile(filteredAuthData, filteredProfileData);
      
      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: `Could not update profile: ${error.message}` });
      } else {
        toast({ title: 'Success', description: 'Your profile has been updated.' });
      }
    });
  };

  if (!currentUser || !userProfile) {
    return <div className="flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={currentUser.photoURL || undefined} alt={userProfile.displayName || 'User'} />
            <AvatarFallback className="text-xl">
              {currentUser.photoURL ? null : <UserIcon className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{userProfile.displayName || 'Staff Member'}</CardTitle>
            <CardDescription>Staff Member</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function StaffMyInfoPage() {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
     return <div className="flex items-center justify-center p-8"><Loader2 className="h-12 w-12 animate-spin" /></div>
  }

  if (!currentUser) {
    return null; // The layout handles redirection
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-4">My Info</h1>
        <MyInfoCard />
      </div>
    </div>
  );
}
