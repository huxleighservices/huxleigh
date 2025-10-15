
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from '@/components/Logo';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ListItem = ({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      href={href}
      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      {children && (
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      )}
    </Link>
  </li>
);

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center">
            <Logo className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) =>
            link.children ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'flex items-center gap-1 transition-colors hover:text-foreground/80',
                      pathname.startsWith(
                        `/${link.label.toLowerCase().replace(' ', '-')}`
                      ) ||
                        (link.label === 'Company' &&
                          (pathname === '/about' ||
                            pathname === '/company/news' ||
                            pathname === '/company/careers'))
                        ? 'text-foreground'
                        : 'text-foreground/60'
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <ul className="grid gap-3 p-4">
                    {link.children.map((child) => (
                      <ListItem
                        key={child.label}
                        title={child.label}
                        href={child.href}
                      >
                        {child.description}
                      </ListItem>
                    ))}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">A list of links to navigate the website.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4 pr-6">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Logo className="h-6 w-auto" />
                  </Link>
                </div>
                <nav className="flex flex-col gap-4 py-4 pr-6">
                  <Accordion
                    type="multiple"
                    className="w-full"
                    defaultValue={['Company']}
                  >
                    {navLinks.map((link) =>
                      link.children ? (
                        <AccordionItem
                          value={link.label}
                          key={link.label}
                          className="border-b-0"
                        >
                          <AccordionTrigger className="py-2 text-lg hover:no-underline">
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent className="pl-4">
                            <ul className="space-y-2">
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                      'block text-muted-foreground hover:text-foreground',
                                      pathname === child.href &&
                                        'text-foreground font-semibold'
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href!}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'text-lg transition-colors hover:text-foreground/80',
                            pathname === link.href
                              ? 'text-foreground font-semibold'
                              : 'text-foreground/60'
                          )}
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </Accordion>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
