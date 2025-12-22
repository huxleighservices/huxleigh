
'use client';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const pricingTiers = [
  {
    name: 'FREE',
    monthlyPrice: '0',
    annualPrice: '0',
    features: [
      '1 Account',
      'Caption Bot',
      'Camp/ai/gn',
    ],
    paymentLinks: {
      monthly: 'https://delture.com',
      annually: 'https://delture.com',
    },
  },
  {
    name: 'PRO',
    monthlyPrice: '34.99',
    annualPrice: '26.99',
    features: [
      '5 Accounts',
      'Content Agent',
      'Caption Bot',
      'Camp/ai/gn +',
    ],
    paymentLinks: {
      monthly: 'https://buy.stripe.com/7sYbJ3dwCf8Zcse1u43ZK04',
      annually: 'https://buy.stripe.com/fZu4gB0JQgd30Jwc8I3ZK02',
    },
  },
];

const testimonials = [
  {
    quote: 'Everyone likes [Delture] a lot and you guys are doing a great job.',
    author: 'Indiana University at Indianapolis Fraternity Chapter',
  },
  {
    quote: 'I wish this came around when I just joined our chapter, wow!',
    author: 'University of Pittsburgh Fraternity Chapter',
  },
];

export default function DelturePage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'annually'
  );

  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1738"
          alt="A party scene"
          fill
          className="object-cover"
          data-ai-hint="party social"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-20 container py-12 flex flex-col items-center text-center">
          <div className="relative p-8 sm:p-12 glassmorphism rounded-2xl border-4 border-gray-200/50">
            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="https://delture.com/delture-logo-3.png"
                alt="Delture Logo"
                width={400}
                height={133}
                className="mb-4"
                priority
              />
              <p className="mt-4 text-lg text-white max-w-md">
                The all-in-one Ai-powered social media software solution for student organizations
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#ff0033] text-white hover:bg-red-500/90 font-bold"
            >
              <Link href="https://delture.com" target="_blank">
                Launch Delture Social Suite
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              Beautifully Crafted, Intuitively Designed
            </h2>
            <p className="mt-4 text-lg" style={{ color: '#ff0033' }}>
              Manage your social presence from anywhere, on any device.
            </p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 group">
              <div className="relative transition-transform duration-500 transform-gpu group-hover:scale-105">
                <Image
                  src="https://preview.redd.it/delture-marketing-desktop-v0-vdvhrz080rrf1.png?width=1080&crop=smart&auto=webp&s=94abcfcc01a8900ebc1fb44c3357906219b84617"
                  alt="Delture Desktop"
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-center group">
              <div className="relative w-2/3 md:w-full transition-transform duration-500 transform-gpu group-hover:scale-105">
                <Image
                  src="https://preview.redd.it/delture-marketing-mobile-v0-g6fdh1g00rrf1.png?width=1080&crop=smart&auto=webp&s=88c4547c4a3d453189b712604d1f54d2ab472d64"
                  alt="Delture Mobile"
                  width={1080}
                  height={1920}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#ff0033]">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">
              Choose Your Plan
            </h2>
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
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/50 [&>span]:bg-red-500"
              />
              <Label
                htmlFor="billing-cycle-switch"
                className={billingCycle === 'annually' ? 'font-bold' : ''}
              >
                Annually
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch justify-center">
            {pricingTiers.map((tier) => (
                <Card
                key={tier.name}
                className="flex flex-col rounded-xl bg-background/90 text-foreground border shadow-xl backdrop-blur-sm"
              >
                <CardHeader className="text-center p-8">
                  <CardTitle className="text-3xl font-extrabold uppercase tracking-widest text-[#ff0033]">
                    {tier.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-8 pt-0">
                  <div className="text-center mb-6">
                    {tier.name === 'FREE' ? (
                       <span className="text-5xl font-bold">
                        FREE
                       </span>
                    ) : (
                      <>
                        <span className="text-5xl font-bold">
                          $
                          {billingCycle === 'annually'
                            ? tier.annualPrice
                            : tier.monthlyPrice}
                        </span>
                        <span className="text-sm text-gray-500">/mo</span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-red-500" />
                        <span>
                          {typeof feature === 'string' ? feature : feature.text}
                          {typeof feature !== 'string' && feature.comingSoon && (
                            <span className="ml-2 text-xs font-bold text-primary animate-pulse">
                              (Coming Soon)
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                      asChild
                      className="bg-[#ff0033] hover:bg-red-700 text-white w-full font-bold py-6 text-lg"
                  >
                      <Link
                        href={tier.paymentLinks[billingCycle]}
                        target={tier.name === 'FREE' ? '_blank' : '_blank'}
                      >
                        {tier.name === 'FREE' ? 'Get Started' : 'Sign Up'}
                      </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-4xl font-bold md:text-5xl">
              What Our Chapters Are Saying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="glassmorphism border">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg italic flex-1">
                    "{testimonial.quote}"
                  </blockquote>
                  <footer className="mt-4 text-right" style={{ color: '#ff0033' }}>
                    - {testimonial.author}
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold">
              Have a question for us? Reach us here:
            </h3>
            <div className="mt-4 flex justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="tel:412-444-5041" className="hover:underline" style={{ color: '#ff0033' }}>
                  412-444-5041
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:sales@huxleigh.com" className="hover:underline" style={{ color: '#ff0033' }}>
                  sales@huxleigh.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
