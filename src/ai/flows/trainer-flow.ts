
'use server';

/**
 * @fileOverview A flow for handling AI-powered sales training simulations.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { TrainingFeedbackSchema, TrainingMessageSchema } from '@/types/schemas';

export const TrainerFlowInputSchema = z.object({
  phase: z.enum([
    'prospecting',
    'qualification',
    'discovery',
    'proposal',
    'objection-handling',
    'closing',
  ]),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  conversationHistory: z.array(TrainingMessageSchema).optional(),
  userMessage: z.string(),
});
export type TrainerFlowInput = z.infer<typeof TrainerFlowInputSchema>;

export const TrainerFlowOutputSchema = z.object({
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
};

const trainerFlow = ai.defineFlow(
  {
    name: 'trainerFlow',
    inputSchema: TrainerFlowInputSchema,
    outputSchema: TrainerFlowOutputSchema,
  },
  async (input) => {
    const { phase, difficulty, conversationHistory, userMessage } = input;
    const systemPrompt = `
      ${prompts[phase]}
      Your difficulty is ${difficulty}. For Beginner, be more forgiving. For Advanced, be very challenging.
      The conversation history is provided below.
      Your task is to generate the next AI response in the conversation.
      If the user's message indicates they are concluding the sale or giving up, you should also provide constructive feedback on their performance based on the entire conversation.
    `;

    const isLastMessage = userMessage.toLowerCase().includes("thanks for your time") || userMessage.toLowerCase().includes("end simulation");
    
    const generateInput = {
        history: conversationHistory?.map(m => ({role: m.role, content: [{text: m.content}]})),
        prompt: userMessage,
        system: systemPrompt,
        output: {
            schema: z.object({
                aiResponse: z.string(),
                feedback: isLastMessage ? TrainingFeedbackSchema : z.undefined(),
            }),
        }
    };
    
    const { output } = await ai.generate(generateInput);
    
    return output || { aiResponse: "I'm sorry, I encountered an error. Please try again." };
  }
);


export async function runTrainerFlow(
  input: TrainerFlowInput
): Promise<TrainerFlowOutput> {
  return trainerFlow(input);
}

