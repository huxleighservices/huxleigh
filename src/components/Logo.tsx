
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/Huxleigh logo icon 2026.png"
      alt="Huxleigh Icon"
      width={125}
      height={25}
      className={cn(className)}
      priority
    />
  );
}
