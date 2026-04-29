
import { Mail, Phone, TriangleAlert } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ContactPage() {
  const isResendConfigured =
    process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here';

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative border-b border-white/10 py-24 md:py-32 overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/15 animate-glow-pulse top-[-150px] left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 grid-overlay" />
        <div className="container text-center relative z-10">
          <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">Reach Out</p>
          <h1 className="font-headline text-4xl font-bold md:text-6xl text-white">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a question or want to work with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="glow-orb w-[400px] h-[400px] bg-blue-700/10 animate-glow-pulse top-1/2 left-[-50px] -translate-y-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-cyan-500/8 animate-glow-pulse top-1/2 right-[-50px] -translate-y-1/2" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10 grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="glass rounded-2xl p-8 space-y-10">
            <div>
              <h2 className="text-xl font-bold font-headline text-primary mb-5">Corporate Inquiries</h2>
              <div className="space-y-4">
                <a href="tel:412-339-0597" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span>412-339-0597</span>
                </a>
                <a href="mailto:service@huxleigh.com" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span>service@huxleigh.com</span>
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold font-headline text-primary mb-5">Sales & Product Inquiries</h2>
              <div className="space-y-4">
                <a href="tel:412-444-5041" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span>412-444-5041</span>
                </a>
                <a href="mailto:sales@huxleigh.com" className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors group">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span>sales@huxleigh.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-bold font-headline text-primary mb-8">Send us a Message</h2>
            {!isResendConfigured && (
              <Alert variant="destructive" className="mb-6 bg-destructive/10 border-destructive/30">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Email Service Not Configured</AlertTitle>
                <AlertDescription>
                  The contact form is currently disabled. Please add your Resend API key to the .env file to enable it.
                </AlertDescription>
              </Alert>
            )}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
