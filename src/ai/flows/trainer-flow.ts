
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
      ${prompts[phase]}
      Your difficulty is ${difficulty}. For Beginner, be more forgiving. For Advanced, be very challenging.
      The conversation history is provided below.
      
      {{#if isFinalTurn}}
      This is the final turn of the simulation. Your next response MUST be the final one.
      - DO NOT generate a conversational 'aiResponse'.
      - Instead, act as an expert sales coach and provide detailed, constructive feedback on the user's performance throughout the entire conversation.
      - Populate the 'feedback' object with 'overallAssessment', 'positivePoints', and 'areasForImprovement'.
      - Your feedback should be insightful and help the user improve.
      {{else}}
      This is a conversational turn. Your task is to generate the next AI response in the conversation.
      - Your response should be a single, natural-sounding reply.
      - DO NOT provide feedback yet.
      {{/if}}
    `;
    
    const generateInput = {
        history: conversationHistory?.map(m => ({role: m.role, content: [{text: m.content}]})),
        prompt: userMessage,
        system: systemPrompt,
        custom: { isFinalTurn }, // Pass isFinalTurn to the prompt context
        output: {
            schema: z.object({
                aiResponse: isFinalTurn ? z.string().optional() : z.string(),
                feedback: isFinalTurn ? TrainingFeedbackSchema : TrainingFeedbackSchema.optional(),
            }),
        }
    };
    
    const { output } = await ai.generate(generateInput);
    
    if (!output) {
        throw new Error('Failed to generate AI response');
    }
    
    // In the final turn, aiResponse might be empty, but feedback should exist.
    if (isFinalTurn && !output.feedback) {
        throw new Error('Failed to generate feedback on the final turn.');
    }

    if (!isFinalTurn && !output.aiResponse) {
        throw new Error('Failed to generate AI response for a conversational turn.');
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
