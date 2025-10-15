'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { newsItems } from '@/lib/data';

export default function NewsPage() {
  const sortedNews = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <section className="bg-card py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Company News
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            The latest updates, announcements, and milestones from Huxleigh.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-3xl mx-auto"
          >
            <CarouselContent>
              {sortedNews.map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                           <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-headline">
                            {item.title}
                          </CardTitle>
                          <CardDescription>
                            {new Date(item.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              timeZone: 'UTC',
                            })}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.content}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
