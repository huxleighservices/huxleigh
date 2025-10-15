import { EnterpriseActivationForm } from './EnterpriseActivationForm';

export default function EnterpriseActivationPage() {
  return (
    <div className="container flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-4xl font-bold font-headline text-violet-400 mb-4">
        Enterprise Managed Account Activation
      </h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Please allow up to 24 hours for your account to be activated. You will receive a notification via email once it's ready.
      </p>
      <EnterpriseActivationForm />
    </div>
  );
}
