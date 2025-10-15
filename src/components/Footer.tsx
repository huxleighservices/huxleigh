import Link from 'next/link';
import Logo from '@/components/Logo';
import { navLinks, socialLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-12">
          <div className="flex flex-col items-start col-span-12 md:col-span-3">
            <Link href="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="mt-4 text-muted-foreground">
              Powerful AI Software for Powerful People.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">
            {navLinks
              .filter((link) => link.children)
              .map((link) => (
                <div key={link.label}>
                  <h3 className="font-semibold tracking-wider text-foreground">
                    {link.label}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {link.children!.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            <div>
              <h3 className="font-semibold tracking-wider text-foreground">
                Connect
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="tel:412-339-0597"
                    className="text-muted-foreground hover:text-primary"
                  >
                    412-339-0597
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:service@huxleigh.com"
                    className="text-muted-foreground hover:text-primary"
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
                    className="text-muted-foreground hover:text-primary"
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Huxleigh LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
