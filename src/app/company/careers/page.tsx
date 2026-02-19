
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CareersPage() {
  return (
    <div className="bg-white text-foreground">
      <section className="py-16 md:py-24 text-center border-b">
        <div className="container">
          <h1 className="text-5xl md:text-7xl font-bold text-primary tracking-wider font-headline">
            Join Us
          </h1>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground/80 tracking-wide font-headline">
            This is the Huxleigh Family
          </h2>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container max-w-4xl text-center">
            <h3 className="text-2xl font-headline text-primary">We're Not Currently Hiring</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              While we don't have any open positions at the moment, we are always interested in connecting with talented individuals. If you are passionate about what we do, please feel free to send us an inquiry.
            </p>
            <Button asChild className="mt-8">
                <Link href="/contact">Contact Us</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
