'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const enterpriseFormSchema = z.object({
  enterpriseOrganization: z.string().min(1, 'Please select an organization.'),
  legalName: z.string().min(1, 'Legal Name is required'),
  stageName: z.string().min(1, 'Stage Name is required'),
  email: z.string().email('A valid email address is required'),
});

export async function submitEnterpriseForm(prevState: any, formData: FormData) {
  const validatedFields = enterpriseFormSchema.safeParse({
    enterpriseOrganization: formData.get('enterpriseOrganization'),
    legalName: formData.get('legalName'),
    stageName: formData.get('stageName'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Validation failed. Please check the fields.',
    };
  }

  const { enterpriseOrganization, legalName, stageName, email } = validatedFields.data;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Huxleigh Activation <onboarding@resend.dev>',
      to: ['service@huxleigh.com'],
      subject: `Enterprise Activation Request: ${enterpriseOrganization} - ${stageName}`,
      html: `
        <h1>New Enterprise Activation Request</h1>
        <p><strong>Enterprise Organization:</strong> ${enterpriseOrganization}</p>
        <p><strong>Legal Name:</strong> ${legalName}</p>
        <p><strong>Stage Name:</strong> ${stageName}</p>
        <p><strong>Submitter's E-mail:</strong> ${email}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
      };
    }

    return {
      success: true,
      message: 'Your activation request has been sent successfully!',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}
