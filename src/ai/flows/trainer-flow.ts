'use server';

/**
 * @fileOverview A flow for handling AI-powered sales training simulations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TrainingFeedbackSchema, TrainingMessageSchema } from '@/types/schemas';

const USER_TURN_LIMIT = 5;

const TrainerFlowInputSchema = z.object({
  phase: z.enum([
    'prospecting',
    'qualification',
    'discovery',
    'proposal',
    'objection-handling',
    'closing',
    'cold-call',
  ]),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  conversationHistory: z.array(TrainingMessageSchema),
  userMessage: z.string(),
});
export type TrainerFlowInput = z.infer<typeof TrainerFlowInputSchema>;

const TrainerFlowOutputSchema = z.object({
  aiResponse: z.string().describe('The AI\'s response in the conversation.'),
  feedback: TrainingFeedbackSchema.optional().describe('Feedback on the user\'s performance if the conversation has concluded.'),
});
export type TrainerFlowOutput = z.infer<typeof TrainerFlowOutputSchema>;

const prompts = {
    prospecting: `You are an AI sales trainer. The user is practicing prospecting. Your goal is to act as a potential lead. The user will initiate the conversation. Respond naturally based on their approach. The scenario is a cold outreach (e.g., email or DM). The user is trying to sell an AI-powered sales training software.`,
    qualification: `You are an AI sales trainer. The user is practicing qualifying a lead. You are a potential customer who has shown initial interest. The user's job is to ask questions to see if you are a good fit. Your persona is a busy sales manager at a mid-sized tech company. Be skeptical but not impossible.`,
    discovery: `You are an AI sales trainer. The user is in the discovery phase. You are a qualified lead. The user needs to understand your specific pain points and needs. Your company struggles with long onboarding times for new sales reps. Ask questions and reveal information gradually.`,
    proposal: `You are an AI sales trainer. The user is presenting a proposal. You have already gone through discovery and are now reviewing their offer. Scrutinize the details of the proposal, ask about pricing, ROI, and implementation details.`,
    'objection-handling': `You are an AI sales trainer. The user is facing objections. You are a prospect with common objections like "It's too expensive," "We don't have time for training," or "We're happy with our current solution." The user must overcome these.`,
    closing: `You are an AI sales trainer. The user is trying to close the deal. You are a prospect who is on the fence. You are looking for a final nudge or a compelling reason to sign the contract. The user's goal is to get you to commit.`,
    'cold-call': `You are an AI sales trainer. The user is practicing a cold call. You are a busy executive who was not expecting their call. Be slightly annoyed but willing to listen for a few moments if they are compelling. The user is selling AI training software.`
};

const trainerFlow = ai.defineFlow(
  {
    name: 'trainerFlow',
    inputSchema: TrainerFlowInputSchema,
    outputSchema: TrainerFlowOutputSchema,
  },
  async (input) => {
    const { phase, difficulty, conversationHistory, userMessage } = input;
    
    // Check if this is the final turn
    const isFinalTurn = conversationHistory.filter(m => m.role === 'user').length >= USER_TURN_LIMIT;

    const systemPrompt = `
      You are an AI sales trainer simulating a B2B sales conversation.
      PHASE: ${prompts[phase]}
      DIFFICULTY: ${difficulty}. For Beginner, be more forgiving. For Advanced, be very challenging.
      CONVERSATION HISTORY is provided below.

      {{#if isFinalTurn}}
      This is the final turn. The simulation is over. Your task is to provide feedback.
      - DO NOT generate a conversational 'aiResponse'.
      - Act as an expert sales coach and provide a detailed, constructive performance review based on the entire conversation.
      - Populate the 'feedback' object with:
        - 'overallAssessment': A summary of the user's performance.
        - 'positivePoints': A list of their strengths (what they did well).
        - 'areasForImprovement': A list of their weaknesses (what they could do better).
      - Your feedback must be insightful and help the user improve.
      {{else}}
      This is a conversational turn. Your task is to generate the next AI response.
      - Stay in character based on the phase and difficulty.
      - Your response should be a single, natural-sounding reply.
      - DO NOT provide feedback yet. Only generate the 'aiResponse' field.
      {{/if}}
    `;

    const model = ai.getModel('googleai/gemini-2.5-flash');

    const result = await model.generate({
        prompt: `
            SYSTEM PROMPT: ${systemPrompt}
            
            CONVERSATION HISTORY:
            ${conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n')}
            user: ${userMessage}
        `,
        custom: { isFinalTurn },
        output: {
            schema: z.object({
                aiResponse: isFinalTurn ? z.string().optional().describe("This should be empty in the final turn.") : z.string().describe("The AI's conversational response."),
                feedback: isFinalTurn ? TrainingFeedbackSchema : TrainingFeedbackSchema.optional().describe("This should only be populated in the final turn."),
            }),
        }
    });

    const output = result.output;
    
    if (!output) {
        throw new Error('Failed to generate AI response');
    }
    
    if (isFinalTurn && !output.feedback) {
        // AI failed to provide feedback. Let's try to generate it again, forcefully.
        const feedbackPrompt = `The sales simulation is over. Based on the following conversation, provide a performance review. Conversation: ${[...conversationHistory, {role: 'user', content: userMessage}].map(m => `${m.role}: ${m.content}`).join('\n')}`;

        const feedbackResult = await model.generate({
          prompt: feedbackPrompt,
          output: { schema: TrainingFeedbackSchema }
        });
        if (!feedbackResult.output) throw new Error('Failed to generate feedback on the final turn.');
        return { aiResponse: '', feedback: feedbackResult.output };
    }

    if (!isFinalTurn && !output.aiResponse) {
        // AI failed to provide a response.
        return { aiResponse: "I'm not sure how to respond to that. Could you try rephrasing?", feedback: undefined };
    }
    
    return output;
  }
);


export async function runTrainerFlow(
  input: TrainerFlowInput
): Promise<TrainerFlowOutput> {
  const result = await trainerFlow(input);
  
  if (!result.aiResponse && !result.feedback) {
    throw new Error('Failed to generate a valid trainer response or feedback.');
  }
  
  return result;
}
