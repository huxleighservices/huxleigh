
'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Hand, Star, Mic, DiscAlbum } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const pricingPlans = [
  {
    name: 'Sound Check',
    icon: <Mic className="h-10 w-10 text-violet-400" />,
    description: 'The Bare Minimum',
    monthlyPrice: '0',
    annualPrice: '0',
    features: [
      'Content Calendar',
      '1-on-1 Content Agent',
      '5 Monthly Content Creation Credits',
      'Caption Bot',
    ],
    isPopular: false,
    paymentLinks: {
      monthly: '#',
      annually: '#',
    },
  },
  {
    name: 'Headliner',
    icon: <Star className="h-10 w-10 text-violet-400" />,
    description: 'All of the Benefits for Solo Musicians',
    monthlyPrice: '24.99',
    annualPrice: '19.99',
    features: [
      'Content Calendar',
      '1-on-1 Content Agent',
      '20 Monthly Content Creation Credits',
      'Camp/AI/gn Tool',
      'Caption Bot',
      'File Storage Connector',
    ],
    isPopular: true,
    paymentLinks: {
      monthly: 'https://buy.stripe.com/3cIdRb78ee4V3VIegQ3ZK0f',
      annually: 'https://buy.stripe.com/eVqeVffEK4ulak6goY3ZK08',
    },
  },
  {
    name: 'Encore',
    icon: <DiscAlbum className="h-10 w-10 text-violet-400" />,
    description: 'An Unmatched Solution for Small Teams',
    monthlyPrice: '32.99',
    annualPrice: '28.99',
    features: [
      'Up to 10 Sign-ons',
      'Content Calendar',
      '1-on-1 Content Agents',
      'File Storage Connector',
      '50 Monthly Content Creation Credits',
      'Camp/AI/gn Tool',
      'Caption Bot',
    ],
    isPopular: false,
    paymentLinks: {
      monthly: 'https://buy.stripe.com/bJe9AV0JQ9OF63Qb4E3ZK0d',
      annually: 'https://buy.stripe.com/14A9AV64a1i9ak6fkU3ZK0e',
    },
  },
  {
    name: 'Standing O',
    icon: <Hand className="h-10 w-10 text-violet-400" />,
    description: 'True Enterprise Solutions for the Large Labels',
    monthlyPrice: '49.99',
    annualPrice: '39.99',
    features: [
      'Unlimited Sign-ons',
      'Content Agent Sign-on',
      'Content Calendar',
      '1-on-1 Content Agents',
      'File Storage Connector',
      'Unlimited Monthly Content Creation Credits',
      'Camp/Al/gn Tool',
      'Caption Bot',
    ],
    isPopular: false,
    paymentLinks: {
      monthly: 'https://buy.stripe.com/8x29AV8ci0e5gIub4E3ZK0b',
      annually: 'https://buy.stripe.com/4gMdRb64abWN8bYc8I3ZK0c',
    },
  },
];

export default function StratavuePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'annually'
  );

  return (
    <div className="bg-black -my-16 flex flex-col">
      <section className="flex flex-col items-center justify-center text-center overflow-hidden pt-16 pb-8">
        <div className="relative z-10 p-8 rounded-lg flex flex-col items-center">
          <Image
            src="https://stratavue.app/logo.png?v=2"
            alt="Stratavue Logo"
            width={400}
            height={100}
            priority
            className="drop-shadow-2xl"
          />
          <p className="mt-4 text-lg text-violet-300 text-center max-w-md">
            Reach New Heights with the Premiere AI-Assisted Music Marketing
            Suite
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-violet-600 text-white hover:bg-violet-700 font-bold"
            >
              <Link href="https://stratavue.app" target="_blank">
                Launch Web App
              </Link>
            </Button>
          </div>
          <video
            src="https://stratavue.app/login-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="mt-8 rounded-lg shadow-lg w-full max-w-4xl"
          />
        </div>
      </section>

      <section className="py-2 relative overflow-hidden">
        <div className="container relative z-10 flex justify-center py-8">
          <Image
            src="https://i.redd.it/foyqn8dt4rrf1.png"
            alt="Stratavue Screencast"
            width={1080}
            height={607}
            className="rounded-lg bg-transparent"
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">
              Pricing Plans
            </h2>
            <p className="mt-4 text-lg text-violet-300">
              Choose the perfect plan to orchestrate your success.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8 text-white">
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
                  setBillingCycle(checked ? 'annually' : 'monthly');
                }}
                 className="data-[state=checked]:bg-violet-500 data-[state=unchecked]:bg-violet-500/50 [&>span]:bg-background"
              />
              <Label
                htmlFor="billing-cycle-switch"
                className={billingCycle === 'annually' ? 'font-bold' : ''}
              >
                Annually
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {pricingPlans.map((plan) => {
              const isFree =
                (billingCycle === 'annually' && plan.annualPrice === '0') ||
                (billingCycle === 'monthly' && plan.monthlyPrice === '0');
              const price =
                billingCycle === 'annually'
                  ? plan.annualPrice
                  : plan.monthlyPrice;

              return (
              <Card
                key={plan.name}
                className={cn(
                  'flex flex-col bg-gray-900/50 text-white rounded-xl border-violet-500/30',
                  {
                    'border-2 border-violet-500 shadow-2xl shadow-violet-500/20':
                      plan.isPopular,
                  }
                )}
              >
                <CardHeader className="text-center p-6 items-center">
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-violet-600 text-white font-bold text-sm uppercase px-4 py-1 rounded-full">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <div className="mb-4 h-10 w-10">{plan.icon}</div>
                  <CardTitle className="text-2xl font-bold tracking-wider uppercase">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-violet-300 h-10">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 p-6 pt-0">
                  <div className="text-center mb-6">
                     {isFree ? (
                      <span className="text-5xl font-bold">Free</span>
                    ) : (
                      <>
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-sm text-white/70 block">/mo</span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-violet-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full font-bold py-6 text-lg bg-violet-600 hover:bg-violet-700 text-white mt-auto"
                  >
                    <Link
                      href={isFree ? 'https://stratavue.app/' : plan.paymentLinks[billingCycle]}
                      target={isFree ? '_blank' : '_blank'}
                    >
                      {isFree ? 'Get Started' : 'Buy Now'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )})}
          </div>
           <div className="mt-16 text-center">
            <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700 text-white font-bold">
              <Link href="/marketing-products/stratavue/enterprise-activation">
                Enterprise Managed Account Activation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}




