'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
    return {
       errors: {},
       message: 'The email service is not configured. Please contact support.',
    }
  }

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
    };
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Huxleigh Contact Form <onboarding@resend.dev>',
      to: ['service@huxleigh.com'],
      reply_to: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

     if (error) {
      console.error('Resend error:', error);
      return {
        message: 'Failed to send message. Please try again later.',
        errors: {},
      };
    }


    return {
      message: 'Thank you for your message! We will get back to you shortly.',
      errors: null,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      errors: {},
    };
  }
}
