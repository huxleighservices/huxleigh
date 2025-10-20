
'use server';
/**
 * @fileOverview An AI agent for running a voice call sales simulation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { CallSimulationInput, SimulationOutput } from '@/types/trainer';
import { generateSpeechFlow } from './text-to-speech-flow';

const USER_TURN_LIMIT = 5;

const CallPersonaSchema = z.object({
    role: z.enum(['C-Suite Executive', 'Receptionist', 'Technology Purchaser', 'New Hire', 'Middle Management']),
    gender: z.enum(['Male', 'Female']),
    attitude: z.enum(['Friendly', 'Skeptical', 'Busy', 'Hostile']),
    qualification: z.enum(['Good Fit', 'Bad Fit', 'Unsure']),
});

const CallConversationMessageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    text: z.string(),
});

const CallSimulationInputSchema = z.object({
  persona: CallPersonaSchema,
  conversationHistory: z.array(CallConversationMessageSchema),
});

const CallSimulationInternalInputSchema = z.object({
  persona: CallPersonaSchema,
  conversationHistory: z.array(CallConversationMessageSchema),
  isFinalTurn: z.boolean(),
});

const CallSimulationOutputSchema = z.object({
    response: z.string().optional().describe("The AI's verbal response as the prospect."),
    audioUrl: z.string().optional().describe("The data URI of the generated speech for the response."),
    feedback: z.object({
        overallAssessment: z.string().describe("A general summary of the user's performance on the call."),
        positivePoints: z.array(z.string()).describe("A list of effective techniques the user employed."),
        areasForImprovement: z.array(z.string()).describe("A list of specific suggestions for improvement."),
    }).optional(),
    isComplete: z.boolean(),
});

const prompt = ai.definePrompt({
  name: 'callSimulationPrompt',
  input: { schema: CallSimulationInternalInputSchema },
  // Output schema is slightly different from flow's output, as audioUrl is added later
  output: { schema: CallSimulationOutputSchema.omit({ audioUrl: true }) },
  model: 'googleai/gemini-2.5-flash',
  prompt: `You are an advanced AI role-playing and training assistant for our AI training software. You are simulating a voice call.

SIMULATION CONTEXT:
The user is a sales representative for the AI training software. They are on a call with you, a potential client. The user's goal is to effectively navigate the sales conversation based on your persona.

YOUR PERSONA:
-   Role: {{{persona.role}}}
-   Attitude: {{{persona.attitude}}}
-   Qualification: {{{persona.qualification}}}
-   Gender: {{{persona.gender}}} (This should subtly influence your language and tone, but do not state it.)

CONVERSATION HISTORY (so far):
{{#each conversationHistory}}
-   {{role}}: {{{text}}}
{{/each}}

YOUR TASK:
{{#if isFinalTurn}}
    This is the final turn. The user has used all their speaking prompts. Enter FEEDBACK MODE.
    -   Stop role-playing as the prospect.
    -   Act as an expert sales coach.
    -   Analyze the ENTIRE conversation history. Assess the user's performance based on their tone, strategy, and ability to handle your persona. Did they ask good questions? Did they build rapport? Did they handle objections well?
    -   Provide a detailed, constructive performance review.
    -   Populate the 'feedback' object with 'overallAssessment', 'positivePoints', and 'areasForImprovement'.
    -   Set 'isComplete' to true.
    -   DO NOT generate a 'response' field.
{{else}}
    This is a conversational turn. Enter SIMULATION MODE.
    -   Respond verbally to the user's last statement, staying perfectly in character based on your persona.
    -   **Friendly/Good Fit**: Be agreeable, ask positive questions. "That sounds interesting, tell me more."
    -   **Skeptical/Unsure**: Be hesitant. Ask for proof. "How do I know this will actually work for us?"
    -   **Busy/Hostile/Bad Fit**: Be dismissive, short, and try to end the call. "I only have a minute, what's the point?" or "This isn't for us."
    -   Your response should be something you would naturally say in a phone call. Keep it concise (1-3 sentences).
    -   Generate ONLY the 'response' field.
    -   'isComplete' should be false.
{{/if}}
`,
});

const callSimulationFlow = ai.defineFlow(
  {
    name: 'callSimulationFlow',
    inputSchema: CallSimulationInputSchema,
    outputSchema: CallSimulationOutputSchema,
  },
  async (input) => {
    const isFinalTurn = input.conversationHistory.filter(m => m.role === 'user').length >= USER_TURN_LIMIT;

    const { output } = await prompt({
        ...input,
        isFinalTurn,
    });
    
    if (!output) {
      throw new Error('Failed to generate call simulation output');
    }
    
    // If we have a response, generate speech for it
    if (output.response) {
      const speechResult = await generateSpeechFlow({
        text: output.response,
        gender: input.persona.gender,
      });
      return { ...output, audioUrl: speechResult.audioUrl };
    }

    // For feedback mode (no response), just return the output
    return output;
  }
);

export async function runCallSimulation(input: CallSimulationInput): Promise<SimulationOutput> {
  const result = await callSimulationFlow(input);
  
  if (result.isComplete === undefined) {
    throw new Error('Failed to generate valid call simulation result');
  }
  
  return result;
}