import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { successStories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle } from 'lucide-react';

export default function SuccessStoriesPage() {
  return (
    <div>
      <section className="bg-card py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Client Success Stories
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Discover how leading companies across industries partner with
            Huxleigh to drive innovation and achieve remarkable results.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="space-y-16">
            {successStories.map((story, index) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === story.imageId
              );
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={story.client}
                  className={`grid grid-cols-1 items-center gap-12 md:grid-cols-2`}
                >
                  <div className={`relative h-80 w-full overflow-hidden rounded-lg shadow-lg md:h-[450px] ${isReversed ? 'md:order-last' : ''}`}>
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={`Success story for ${story.client}`}
                        fill
                        className="object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                     <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="font-bold text-2xl">{story.client}</h3>
                        <p className="text-lg">{story.industry}</p>
                     </div>
                  </div>
                  <div className="space-y-6">
                    <blockquote className="border-l-4 border-primary pl-4 text-xl italic text-foreground">
                      "{story.quote}"
                    </blockquote>
                    
                    <div>
                        <h4 className="font-semibold text-lg mb-2">The Challenge</h4>
                        <p className="text-muted-foreground">{story.problem}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">The Huxleigh Solution</h4>
                        <p className="text-muted-foreground">{story.solution}</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">The Outcome</h4>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 shrink-0" />
                            <p className="text-muted-foreground">{story.outcome}</p>
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
