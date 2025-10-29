'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StaffPage() {
  const { currentUser, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentUser || !userProfile) {
    return (
       <div className="flex h-full flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold">You are not signed in.</h2>
        <p className="mt-2 text-muted-foreground">
          Please sign in to access your staff dashboard.
        </p>
        <Button asChild className="mt-4">
          <Link href="/company/staff/signin">Go to Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">My Info</h1>
      </div>
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={userProfile.photoURL || undefined} alt={userProfile.displayName} />
                        <AvatarFallback>{userProfile.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">{userProfile.displayName}</CardTitle>
                        <CardDescription>{userProfile.email}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p><span className="font-semibold">User ID:</span> {userProfile.uid}</p>
                    <p><span className="font-semibold">Role:</span> <span className="capitalize">{userProfile.role || 'user'}</span></p>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
