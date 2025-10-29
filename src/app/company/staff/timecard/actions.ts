
'use server';
import { Resend } from 'resend';
import type { UserProfile } from '@/types/auth';
import { format } from 'date-fns';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WeeklyTimeCardData {
  weekId: string;
  weekOf: Date;
  totalHours: number;
  punches: any[]; // Timestamps will be serialized
}

export async function sendTimecards(
  user: UserProfile,
  timecards: WeeklyTimeCardData[]
) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
    return {
       success: false,
       message: 'The email service is not configured. Please contact support.',
    }
  }

  const timecardHTML = timecards
    .map(
      (card) => `
    <div style="margin-bottom: 24px; border: 1px solid #eee; border-radius: 8px; padding: 16px;">
      <h2 style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
        Week of ${format(new Date(card.weekOf), 'MMMM d, yyyy')}
      </h2>
      <p style="font-size: 16px; margin-bottom: 16px;">
        <strong>Total Hours:</strong> ${card.totalHours.toFixed(2)}
      </p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Type</th>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Date</th>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Time</th>
          </tr>
        </thead>
        <tbody>
          ${card.punches
            .map(
              (punch) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">
                <strong style="color: ${punch.type === 'in' ? '#22c55e' : '#ef4444'};">
                  ${punch.type.toUpperCase()}
                </strong>
              </td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">
                ${format(new Date(punch.timestamp.seconds * 1000), 'eee, MMM d')}
              </td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">
                ${format(new Date(punch.timestamp.seconds * 1000), 'h:mm:ss a')}
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `
    )
    .join('');

  try {
    const { data, error } = await resend.emails.send({
      from: 'Huxleigh Timecards <onboarding@resend.dev>',
      to: ['service@huxleigh.com'],
      subject: `Timecard Submission from ${user.displayName}`,
      html: `
        <h1>Timecard Submission</h1>
        <p><strong>Employee:</strong> ${user.displayName} (${user.email})</p>
        <p><strong>Submission Date:</strong> ${format(new Date(), 'MMMM d, yyyy')}</p>
        <hr style="margin: 24px 0;" />
        ${timecardHTML}
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
      message: 'Your selected timecards have been successfully emailed.',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'An unexpected error occurred.',
    };
  }
}
