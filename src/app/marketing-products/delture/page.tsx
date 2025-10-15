
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
    name: 'Basic',
    monthlyPrice: '16.99',
    annualPrice: '9.99',
    features: [
      '1 Account',
      '1-on-1 Content Agent',
      '10 Designs/mo. Quota',
      'Monthly Planning Sessions',
      'Calendar Planner',
    ],
    isPopular: false,
    paymentLinks: {
      monthly: 'https://buy.stripe.com/bJeaEZgIOe4V8bY6Oo3ZK03',
      annually: 'https://buy.stripe.com/7sYaEZ2RY3qh1NA4Gg3ZK01',
    },
  },
  {
    name: 'Premium',
    monthlyPrice: '28.99',
    annualPrice: '19.99',
    features: [
      'Up to 5 Accounts',
      '1-on-1 Content Agent',
      '30 Designs/mo. Quota',
      'Bi-weekly Planning Sessions',
      'Calendar Scheduler',
      'Caption Bot',
      'Camp/AI/gn Tool',
      'Insight Assistant',
      'Storage Connector',
    ],
    isPopular: true,
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
      <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="https://packaged-media.redd.it/bthbsvrugwsf1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1759957200&s=1052bb59674b9d574eadc5cd647b345e7547ac6e"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-50 z-10"></div>
        <div className="relative z-20 container py-12 flex flex-col items-center text-center">
          <div className="relative p-12 bg-white/30 backdrop-blur-sm rounded-[calc(var(--radius)+10px)] border-4 border-white/50">
            <div className="relative z-10 p-8 flex flex-col items-center">
              <Image
                src="https://delture.com/delture-logo-3.png"
                alt="Delture Logo"
                width={400}
                height={133}
                className="mb-4"
                priority
              />
              <p className="mt-4 text-lg text-gray-600 max-w-md">
                The all-in-one AI-powered social media software solution built
                for Greek Life
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700 font-bold"
            >
              <Link href="https://delture.com" target="_blank">
                Launch Delture Social Suite
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <section className="bg-gray-900 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">
              Beautifully Crafted, Intuitively Designed
            </h2>
            <p className="mt-4 text-lg text-white/80">
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
                  className="w-full h-auto"
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
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-red-600">
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
                className="data-[state=checked]:bg-white data-[state=unchecked]:bg-white/50 [&>span]:bg-red-600"
              />
              <Label
                htmlFor="billing-cycle-switch"
                className={billingCycle === 'annually' ? 'font-bold' : ''}
              >
                Annually
              </Label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`flex flex-col ${
                  tier.isPopular
                    ? 'border-white border-4 shadow-2xl scale-105'
                    : 'bg-white/10 border-white/30'
                } bg-white/10 text-white rounded-xl`}
              >
                <CardHeader className="text-center p-8">
                  {tier.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-white text-red-600 font-bold text-sm uppercase px-4 py-1 rounded-full">
                        Premium
                      </div>
                    </div>
                  )}
                  <CardTitle className="text-3xl font-extrabold uppercase tracking-widest">
                    {tier.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-8 pt-0">
                  <div className="text-center mb-6">
                    <span className="text-5xl font-bold">
                      $
                      {billingCycle === 'annually'
                        ? tier.annualPrice
                        : tier.monthlyPrice}
                    </span>
                    <span className="text-sm text-white/70">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={tier.isPopular ? 'default' : 'outline'}
                    className={`${
                      tier.isPopular
                        ? 'bg-white text-red-600 hover:bg-gray-200'
                        : 'border-white text-white hover:bg-white/20'
                    } w-full font-bold py-6 text-lg`}
                  >
                    <Link
                      href={tier.paymentLinks[billingCycle]}
                      target="_blank"
                    >
                      Buy Now
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-red-700">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">
              What Our Chapters Are Saying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white/10 text-white border-0">
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
                  <footer className="mt-4 text-right text-white/80">
                    - {testimonial.author}
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center text-white">
            <h3 className="text-2xl font-bold">
              Have a question for us? Reach us here:
            </h3>
            <div className="mt-4 flex justify-center items-center gap-8">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <a href="tel:412-444-5041" className="hover:underline">
                  412-444-5041
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <a href="mailto:delture@huxleigh.com" className="hover:underline">
                  delture@huxleigh.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
