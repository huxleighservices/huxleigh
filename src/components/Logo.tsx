
import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/huxleigh-icon.png"
      alt="Huxleigh Icon"
      width={125}
      height={25}
      className={cn(className)}
      priority
    />
  );
}
