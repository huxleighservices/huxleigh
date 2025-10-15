import Image from 'next/image';
import { Users, Lightbulb, RefreshCw } from 'lucide-react';

const values = [
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Community',
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: 'Creativity',
  },
  {
    icon: <RefreshCw className="h-10 w-10 text-primary" />,
    title: 'Change',
  },
];

const leadershipTeam = [
  {
    name: 'David Zimmerman',
    roles: ['Founder, President', 'Director: Delture, Stratavue'],
  },
  {
    name: 'Patrick McCollum',
    roles: [
      'Vice President of Product Management',
      'Operations Specialist: Delture, Stratavue',
    ],
  },
  {
    name: 'Ken Harris',
    roles: [
      'Vice President of Customer Development',
      'Operations Specialist: Stratavue',
    ],
  },
];

const deltureTeam = [
  {
    name: 'Justin Liu',
    role: 'Outreach Executive',
  },
  {
    name: 'Hudson Bowers',
    role: 'Outreach Representative',
  },
];

const stratavueTeam = [
  {
    name: 'Mason Edmunds',
    role: 'Outreach Executive',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1622542390045-e812a83e59d1?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNvbXB1dGVyJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Person working on a computer"
          fill
          className="object-cover"
          data-ai-hint="computer work"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 container">
          <h1 className="font-headline text-4xl font-bold md:text-6xl text-white">
            Huxleigh Provides Powerful Resources for Powerful Ideas
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold font-headline">
                  {value.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="font-headline text-4xl font-bold md:text-6xl text-primary">
              Meet the Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The architects of innovation, dedicated to building the future of
              AI-powered solutions.
            </p>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-foreground mb-8 font-headline">
              Leadership
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leadershipTeam.map((member) => (
                <div
                  key={member.name}
                  className="bg-background p-6 rounded-lg shadow-sm"
                >
                  <h4 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h4>
                  {member.roles.map((role) => (
                    <p key={role} className="text-muted-foreground mt-1">
                      {role}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="flex justify-center mb-8">
              <Image
                src="https://delture.com/delture-logo-3.png"
                alt="Delture Logo"
                width={200}
                height={66}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {deltureTeam.map((member) => (
                <div
                  key={member.name}
                  className="bg-background p-6 rounded-lg shadow-sm"
                >
                  <h4 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h4>
                  <p className="text-muted-foreground mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <div className="flex justify-center mb-8">
              <Image
                src="https://stratavue.app/logo.png?v=2"
                alt="Stratavue Logo"
                width={300}
                height={75}
                className="brightness-0 invert"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {stratavueTeam.map((member) => (
                <div
                  key={member.name}
                  className="bg-background p-6 rounded-lg shadow-sm lg:col-start-2"
                >
                  <h4 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h4>
                  <p className="text-muted-foreground mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-accent py-8">
          <div className="container text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-accent-foreground">
              WHAT SETS US APART?
            </h2>
          </div>
        </div>
        <div className="bg-background py-16 md:py-24">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="text-lg text-muted-foreground">
              <p>
                We are glad you asked. With our proprietary{' '}
                <span className="font-bold text-foreground">
                  Camp/AI/gn&trade;
                </span>{' '}
                system, our software solutions are built upon the foundation of
                AI-integrated marketing tools.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-headline text-6xl md:text-8xl font-bold text-foreground relative">
                Camp
                <span className="text-primary">/</span>
                AI
                <span className="text-primary">/</span>
                gn
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
