'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const punchSchema = z.object({
  punchType: z.enum(['in', 'out']),
  context: z.string().optional(),
  userName: z.string(),
  userEmail: z.string(),
});

export async function submitPunch(prevState: any, formData: FormData) {
  const validatedFields = punchSchema.safeParse({
    punchType: formData.get('punchType'),
    context: formData.get('context'),
    userName: formData.get('userName'),
    userEmail: formData.get('userEmail'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided. Please check the form.',
    };
  }

  const { punchType, context, userName, userEmail } = validatedFields.data;
  const punchTime = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  try {
    const { data, error } = await resend.emails.send({
      from: 'Huxleigh Timeclock <onboarding@resend.dev>',
      to: ['service@huxleigh.com'],
      subject: `Time Punch Submission: ${userName} - ${punchType.toUpperCase()}`,
      html: `
        <h1>Time Punch Submission</h1>
        <p><strong>Staff Member:</strong> ${userName} (${userEmail})</p>
        <p><strong>Punch Type:</strong> ${punchType.toUpperCase()}</p>
        <p><strong>Time:</strong> ${punchTime}</p>
        <p><strong>Context/Notes:</strong></p>
        <p>${context || 'No notes provided.'}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        message: 'Failed to send punch record. Please try again later.',
      };
    }

    return {
      success: true,
      message: 'Your time punch has been successfully recorded.',
    };
  } catch (error) {
    console.error('Error sending punch email:', error);
    return {
      success: false,
      message: 'An unexpected server error occurred. Please try again.',
    };
  }
}
