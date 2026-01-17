import Image from 'next/image';

export default function HtGoPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-600 via-purple-800 to-indigo-900 text-white text-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <Image
          src="https://preview.redd.it/f16kfi6nmydg1.png?width=1080&crop=smart&auto=webp&s=bdfe55960a1fb027ab317408176e62c59dd0e3a6"
          alt="HT-Go Logo"
          width={400}
          height={100}
          priority
          className="drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]"
        />
        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-wide uppercase drop-shadow-lg">
          The Device that Knows
        </h1>
      </div>
    </div>
  );
}
