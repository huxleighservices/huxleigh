'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const applicationSchema = z.object({
  jobTitle: z.string(),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  resume: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Resume is required.')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      '.pdf, .doc, and .docx files are accepted.'
    ),
});

export async function submitApplication(prevState: any, formData: FormData) {
  const validatedFields = applicationSchema.safeParse({
    jobTitle: formData.get('jobTitle'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    resume: formData.get('resume'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      success: false,
    };
  }

  const { jobTitle, name, email, phone, resume } = validatedFields.data;

  try {
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    const { data, error } = await resend.emails.send({
      from: 'Huxleigh Careers <onboarding@resend.dev>',
      to: ['service@huxleigh.com'],
      reply_to: email,
      subject: `New Application for ${jobTitle}: ${name}`,
      html: `
        <h1>New Job Application</h1>
        <p><strong>Position:</strong> ${jobTitle}</p>
        <p><strong>Applicant:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        message: 'Failed to send application. Please try again later.',
        success: false,
        errors: null,
      };
    }

    return {
      message: 'Your application has been sent successfully!',
      success: true,
      errors: null,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
      errors: null,
    };
  }
}
