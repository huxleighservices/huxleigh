
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-cyan-500/20 animate-glow-pulse top-[-150px] left-[-150px]" />
        <div className="glow-orb w-[500px] h-[500px] bg-blue-700/15 animate-glow-pulse bottom-[-100px] right-[-100px]" style={{ animationDelay: '2s' }} />
        <div className="glow-orb w-[400px] h-[400px] bg-violet-800/10 animate-glow-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 grid-overlay" />

        <div className="relative z-10 container flex flex-col items-center text-center py-32">
          <div className="animate-float">
            <Image
              src="/huxleigh-icon.png"
              alt="Huxleigh"
              width={320}
              height={80}
              priority
              className="mb-12 drop-shadow-[0_0_40px_rgba(34,211,238,0.25)]"
            />
          </div>

          <h1 className="font-headline text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
            Powerful AI<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">
              for Powerful Ideas
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Building the future of AI-driven sales training and intelligent hardware for professionals on the move.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all duration-300"
            >
              <Link href="/HTBase">Explore Products</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Products */}
      <section className="relative py-24 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/10 animate-glow-pulse top-1/2 left-[-100px] -translate-y-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-red-600/10 animate-glow-pulse top-1/2 right-[-100px] -translate-y-1/2" style={{ animationDelay: '2.5s' }} />

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">What We Build</p>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">
              Our Products
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Precision-crafted AI tools designed for the modern sales professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* HT-Base */}
            <div className="group relative glass rounded-2xl p-8 flex flex-col items-center text-center hover:border-cyan-500/40 hover:shadow-[0_0_60px_rgba(34,211,238,0.08)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center w-full">
                <Image
                  src="https://preview.redd.it/mszt14me641g1.png?width=1080&crop=smart&auto=webp&s=767e946bd9165e98a8637eb5cb35ced596f2a4d5"
                  alt="HT-Base"
                  width={220}
                  height={55}
                  className="mb-6 h-14 object-contain"
                />
                <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                  AI-assisted sales training and onboarding software. Train smarter, sell faster.
                </p>
                <Button
                  asChild
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold w-full shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_35px_rgba(34,211,238,0.4)] transition-all"
                >
                  <Link href="/HTBase">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Project Go */}
            <div className="group relative glass rounded-2xl p-8 flex flex-col items-center text-center hover:border-red-500/40 hover:shadow-[0_0_60px_rgba(239,68,68,0.08)] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/5 to-violet-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col items-center w-full">
                <Image
                  src="https://preview.redd.it/f16kfi6nmydg1.png?width=1080&crop=smart&auto=webp&s=bdfe55960a1fb027ab317408176e62c59dd0e3a6"
                  alt="Project Go"
                  width={220}
                  height={55}
                  className="mb-6 h-14 object-contain"
                />
                <p className="text-muted-foreground mb-8 flex-grow leading-relaxed">
                  Portable AI-powered smart assistant built for professionals on the move.
                </p>
                <Button
                  asChild
                  className="bg-red-600 hover:bg-red-500 text-white font-bold w-full shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_35px_rgba(239,68,68,0.4)] transition-all"
                >
                  <Link href="/hardware/project-go">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
