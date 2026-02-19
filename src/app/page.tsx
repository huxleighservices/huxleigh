
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative h-[calc(100vh-5rem)] w-full overflow-hidden">
        <video
          src="https://packaged-media.redd.it/054xs6gmqhkg1/pb/m2-res_1080p.mp4?m=DASHPlaylist.mpd&v=1&e=1771542000&s=4833037e33f62ef2d45a6cc433aac8b4e53e6922"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
              Check us Out
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Delture Card */}
            <div className="flex flex-col items-center p-8 rounded-lg border text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <Image
                src="https://delture.com/delture-logo-3.png"
                alt="Delture Logo"
                width={200}
                height={60}
                className="mb-4 h-16 object-contain"
              />
              <p className="text-muted-foreground mb-6 flex-grow">
                AI-powered social media management for student organizations.
              </p>
              <Button asChild className="bg-[#ff0033] hover:bg-red-700 text-white">
                <Link href="/marketing-products/delture">Learn More</Link>
              </Button>
            </div>

            {/* Stratavue Card */}
            <div className="flex flex-col items-center p-8 rounded-lg border text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
              <Image
                src="https://stratavue.app/logo.png?v=2"
                alt="Stratavue Logo"
                width={200}
                height={60}
                className="mb-4 h-16 object-contain invert"
              />
              <p className="text-muted-foreground mb-6 flex-grow">
                The premiere AI-assisted music marketing suite for artists and labels.
              </p>
              <Button asChild className="bg-violet-600 hover:bg-violet-700 text-white">
                <Link href="/marketing-products/stratavue">Learn More</Link>
              </Button>
            </div>

            {/* HTBase Card */}
            <div className="flex flex-col items-center p-8 rounded-lg border text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
               <Image
                src="https://preview.redd.it/mszt14me641g1.png?width=1080&crop=smart&auto=webp&s=767e946bd9165e98a8637eb5cb35ced596f2a4d5"
                alt="HTBase Logo"
                width={200}
                height={50}
                className="mb-4 h-16 object-contain"
              />
              <p className="text-muted-foreground mb-6 flex-grow">
                AI-assisted sales training and onboarding software.
              </p>
              <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Link href="/HTBase">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
