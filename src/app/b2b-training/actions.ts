
'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import type { TrainingSession } from '@/types/auth';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailSchema = z.object({
  session: z.any(), // Not great, but hard to validate deeply nested object with Zod
  recipientEmail: z.string().email(),
  userName: z.string(),
});

function formatConversation(conversation: {role: string, content: string}[]) {
    return conversation.map(msg => `<p><strong>${msg.role === 'user' ? 'You' : 'AI'}:</strong> ${msg.content}</p>`).join('');
}

export async function sendSessionByEmail(data: { session: TrainingSession; recipientEmail: string, userName: string }) {

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
    return {
       success: false,
       message: 'The email service is not configured. Please contact support.',
    }
  }

  const validatedFields = emailSchema.safeParse(data);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
    };
  }

  const { session, recipientEmail, userName } = validatedFields.data;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: 'Huxleigh Tr/AI/ner <onboarding@resend.dev>',
      to: [recipientEmail],
      subject: `Training Session Report: ${session.name}`,
      html: `
        <h1>Training Session Report</h1>
        <p><strong>Session Name:</strong> ${session.name}</p>
        <p><strong>User:</strong> ${userName}</p>
        <p><strong>Date Created:</strong> ${format(session.createdAt.toDate(), 'PPP p')}</p>
        <hr/>
        <h2>Results</h2>
        ${session.results.map((result: any) => `
            <div>
                <h3>${result.phase} - ${result.difficulty} (${result.completedAt.toDate ? format(result.completedAt.toDate(), 'PP p') : 'Just now'})</h3>
                <h4>Feedback:</h4>
                <ul>
                    <li><strong>Assessment:</strong> ${result.feedback.overallAssessment}</li>
                    <li><strong>Positives:</strong> ${result.feedback.positivePoints.join(', ')}</li>
                    <li><strong>Improvements:</strong> ${result.feedback.areasForImprovement.join(', ')}</li>
                </ul>
                <h4>Conversation:</h4>
                <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; max-height: 200px; overflow-y: auto;">
                    ${formatConversation(result.conversation)}
                </div>
            </div>
            <hr/>
        `).join('')}
      `,
    });

     if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send email. Please try again later.' };
    }

    return { success: true, message: 'Email sent successfully.' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
