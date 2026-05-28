
import Link from 'next/link';
import Logo from '@/components/Logo';
import { navLinks, socialLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12">

          {/* Brand column */}
          <div className="flex flex-col items-start col-span-12 md:col-span-3">
            <Link href="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              Modern Operational Infrastructure.
            </p>
            <p className="mt-2 text-xs text-muted-foreground/60">
              HTBase is a product of Huxleigh LLC.
            </p>
          </div>

          {/* Nav columns */}
          <div className="col-span-12 md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* Products column */}
            {navLinks
              .filter((link) => link.children)
              .map((link) => (
                <div key={link.label}>
                  <h3 className="font-semibold tracking-wider text-foreground text-sm">
                    {link.label}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {link.children!.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            {/* Services column */}
            <div>
              <h3 className="font-semibold tracking-wider text-foreground text-sm">
                Services
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/services"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#focus-areas"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Focus Areas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Start a Project
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect column */}
            <div>
              <h3 className="font-semibold tracking-wider text-foreground text-sm">
                Connect
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="tel:412-339-0597"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    412-339-0597
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:service@huxleigh.com"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    service@huxleigh.com
                  </a>
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-white/10 py-6 sm:flex-row gap-2">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Huxleigh LLC. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Huxleigh &mdash; Modern Operational Infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
}
