
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { jobPostings } from '@/lib/data';
import { Check } from 'lucide-react';
import { JobApplication } from './JobApplication';

export default function CareersPage() {
  return (
    <div>
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <h1 className="text-5xl md:text-7xl font-bold text-accent gold-glow uppercase tracking-wider">
            Join Us
          </h1>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-accent gold-glow uppercase tracking-wide">
            This is the Huxleigh Family
          </h2>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {jobPostings.map((job) => (
              <Card key={job.title} className="bg-card/50">
                <CardHeader>
                  <CardTitle className="text-3xl font-headline text-primary">
                    {job.title}
                  </CardTitle>
                  {job.type && (
                    <CardDescription>{job.type}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                  {job.description.map((section, index) => (
                    <div key={index}>
                      <p>{section}</p>
                    </div>
                  ))}

                  {job.responsibilities && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        Responsibilities
                      </h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {job.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.compensation && (
                     <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        Compensation & Training
                      </h3>
                      <p>{job.compensation}</p>
                    </div>
                  )}

                  {job.qualifications && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        Qualifications
                      </h3>
                      <ul className="space-y-2">
                        {job.qualifications.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                             <Check className="h-5 w-5 mt-1 text-primary shrink-0"/>
                             <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                   {job.benefits && (
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mt-6 mb-2">
                        Benefits
                      </h3>
                      <ul className="space-y-2">
                        {job.benefits.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                             <Check className="h-5 w-5 mt-1 text-primary shrink-0"/>
                             <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4">
                    <JobApplication jobTitle={job.title} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
