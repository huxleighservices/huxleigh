import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PurchaseSuccessPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="container py-24 flex items-center justify-center">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-headline">
            Thank You For Your Order!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your order has been placed successfully. You will receive an email
            confirmation and invoice shortly.
          </p>
          <div>
            <p className="text-sm font-semibold">Your Order ID:</p>
            <p className="text-lg font-mono bg-muted rounded-md p-2 inline-block">
              {params.orderId}
            </p>
          </div>
          <Button asChild className="mt-4">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
