
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, User, BookOpen, LogOut, Clock } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { FirebaseClientProvider } from '@/firebase';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isSignInPage = pathname.startsWith('/company/staff/signin');

  useEffect(() => {
    if (!loading) {
      if (currentUser && isSignInPage) {
        router.replace('/company/staff');
      } else if (!currentUser && !isSignInPage) {
        router.replace('/company/staff/signin');
      }
    }
  }, [currentUser, loading, router, pathname, isSignInPage]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isSignInPage) {
    return <FirebaseClientProvider>{children}</FirebaseClientProvider>;
  }

  if (!currentUser) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    // The useEffect above will handle the redirect to signin
  };

  return (
    <FirebaseClientProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar side="left" collapsible="icon" variant="sidebar" className="border-r-2 border-primary/20">
            <SidebarHeader>
              <div className="flex items-center justify-between p-2">
                <Link href="/" className="group-data-[collapsible=icon]:hidden">
                  <Logo className="h-8 w-auto" />
                </Link>
                <SidebarTrigger />
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === '/company/staff'}
                    tooltip={{ children: 'My Info' }}
                  >
                    <Link href="/company/staff">
                      <User />
                      <span>My Info</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {/* The new Timecard link will go here */}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={handleSignOut} tooltip={{ children: 'Sign Out' }}>
                    <LogOut />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <div className="p-4 md:p-8">
              {children}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FirebaseClientProvider>
  );
}
