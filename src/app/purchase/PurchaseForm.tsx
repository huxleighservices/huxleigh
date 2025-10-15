'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pricingPlans } from '@/lib/plans';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createOrder } from '@/ai/flows/create-order-flow';

const FormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'A valid phone number is required'),
  companyName: z.string().optional(),
  planId: z.string().min(1, 'Please select a plan'),
  billingCycle: z.enum(['monthly', 'annually']),
  discountCode: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export function PurchaseForm() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'annually'
  );
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      planId: '',
      billingCycle: 'annually',
      companyName: '',
      discountCode: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        const result = await createOrder(data);

        if (result && result.orderId) {
          toast({
            title: 'Order Successful!',
            description: 'Your order has been placed.',
          });
          router.push(`/purchase/${result.orderId}`);
        } else {
          throw new Error('Order creation failed to return an order ID.');
        }
      } catch (error: any) {
        console.error('Order submission error:', error);
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description:
            error.message ||
            'There was a problem with your submission. Please try again.',
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="billingCycle"
          render={({ field }) => (
            <FormItem>
              <Label>Billing Cycle</Label>
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="billing-cycle-switch"
                  className={billingCycle === 'monthly' ? 'font-bold' : ''}
                >
                  Monthly
                </Label>
                <Switch
                  id="billing-cycle-switch"
                  checked={billingCycle === 'annually'}
                  onCheckedChange={(checked) => {
                    const newCycle = checked ? 'annually' : 'monthly';
                    setBillingCycle(newCycle);
                    field.onChange(newCycle);
                  }}
                />
                <Label
                  htmlFor="billing-cycle-switch"
                  className={billingCycle === 'annually' ? 'font-bold' : ''}
                >
                  Annually
                </Label>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name (Optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="planId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select a Plan</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a plan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pricingPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.category}: {plan.name} ($
                      {billingCycle === 'annually'
                        ? plan.annualPrice
                        : plan.monthlyPrice}
                      /mo)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Code (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full font-bold">
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Place Order
        </Button>
      </form>
    </Form>
  );
}
