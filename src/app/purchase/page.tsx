import { CreditCard } from 'lucide-react';

export default function PurchasePage() {
  return (
    <>
      <section className="bg-card py-16 md:py-24">
        <div className="container text-center">
          <CreditCard className="h-16 w-16 text-primary mb-6 mx-auto" />
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Complete Your Purchase
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Please refer to our product pages for direct payment links.
          </p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container max-w-2xl">
          
        </div>
      </section>
    </>
  );
}
