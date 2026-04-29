
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { newsItems } from '@/lib/data';

export default function NewsPage() {
  const sortedNews = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative border-b border-white/10 py-24 md:py-32 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/15 animate-glow-pulse top-[-150px] left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="container text-center relative z-10">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">Latest Updates</p>
          <h1 className="font-headline text-4xl font-bold md:text-6xl text-white">
            Company News
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The latest updates, announcements, and milestones from Huxleigh.
          </p>
        </div>
      </section>

      {/* News Carousel */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-blue-700/10 animate-glow-pulse top-1/2 left-[-50px] -translate-y-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-violet-700/10 animate-glow-pulse top-1/2 right-[-50px] -translate-y-1/2" style={{ animationDelay: '2s' }} />
        <div className="container relative z-10">
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-3xl mx-auto"
          >
            <CarouselContent>
              {sortedNews.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="glass rounded-2xl p-8 h-full hover:border-white/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.06)] transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-primary/10 rounded-full shrink-0">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-headline font-bold text-white leading-snug">
                          {item.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'UTC',
                          })}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12 border-white/20 bg-white/5 hover:bg-white/10 text-white" />
            <CarouselNext className="-right-4 md:-right-12 border-white/20 bg-white/5 hover:bg-white/10 text-white" />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
