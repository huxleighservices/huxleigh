'use server';
/**
 * @fileOverview A flow for converting text to speech using Google Gemini TTS API directly.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import 'dotenv/config';

const SpeechInputSchema = z.object({
  text: z.string(),
  gender: z.enum(['Male', 'Female']),
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));

    writer.write(pcmData);
    writer.end();
  });
}

// Define the Genkit flow
export const generateSpeechFlow = ai.defineFlow(
  {
    name: 'generateSpeechFlow',
    inputSchema: SpeechInputSchema,
    outputSchema: z.object({ audioUrl: z.string() }),
  },
  async ({ text, gender }) => {
    try {
      console.log(`Generating speech with Gemini TTS... (Gender: ${gender})`);
      const voiceName = gender === 'Male' ? 'Puck' : 'Kore';

      // Use the specialized TTS model
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        prompt: text,
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName,
              },
            },
          },
        },
      });
      
      if (!media?.url) {
        throw new Error('No media URL returned from TTS model.');
      }

      console.log('Audio generated successfully, converting to WAV...');
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      
      const wavBase64 = await toWav(audioBuffer);
      const audioUrl = `data:audio/wav;base64,${wavBase64}`;
      
      console.log('Speech generation completed successfully');
      return { audioUrl };

    } catch (error) {
      console.error('ERROR synthesizing speech:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to generate speech: ${error.message}`);
      }
      throw new Error('Failed to generate speech: Unknown error');
    }
  }
);

// Keep an exported wrapper for type safety if needed elsewhere
export async function generateSpeech(input: {text: string, gender: 'Male' | 'Female'}): Promise<{ audioUrl: string }> {
    return generateSpeechFlow(input);
}
