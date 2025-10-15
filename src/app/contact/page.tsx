import { Mail, Phone, TriangleAlert } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ContactPage() {
  const isResendConfigured = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "your_resend_api_key_here";

  return (
    <div>
      <section className="bg-card py-16 md:py-24">
        <div className="container text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Have a question or want to work with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container max-w-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold font-headline text-primary">Contact Information</h2>
              <div className="flex items-center gap-4 text-lg">
                <Phone className="h-6 w-6 text-primary" />
                <a href="tel:412-339-0597" className="hover:text-primary">
                  412-339-0597
                </a>
              </div>
              <div className="flex items-center gap-4 text-lg">
                <Mail className="h-6 w-6 text-primary" />
                <a
                  href="mailto:service@huxleigh.com"
                  className="hover:text-primary"
                >
                  service@huxleigh.com
                </a>
              </div>
            </div>
            <div>
               <h2 className="text-2xl font-bold font-headline text-primary mb-8">Send us a Message</h2>
                {!isResendConfigured && (
                <Alert variant="destructive" className="mb-4">
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
        </div>
      </section>
    </div>
  );
}
