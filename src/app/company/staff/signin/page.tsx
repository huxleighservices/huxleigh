'use client';
import { SignInForm } from './SignInForm';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';


export default function StaffSignInPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/company/staff');
    }
  }, [currentUser, loading, router]);

  if (loading || currentUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md p-4 md:p-0">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline">My Huxleigh</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your staff dashboard.
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
