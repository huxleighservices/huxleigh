import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Huxleigh Logo"
      width={125}
      height={25}
      className={cn(className)}
      priority
    />
  );
}
