
import { z } from 'zod';

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

export const CallSimulationInputSchema = z.object({
  persona: CallPersonaSchema,
  conversationHistory: z.array(CallConversationMessageSchema),
});

export type CallSimulationInput = z.infer<typeof CallSimulationInputSchema>;

export const SimulationOutputSchema = z.object({
    response: z.string().optional(),
    audioUrl: z.string().optional(),
    feedback: z.object({
        overallAssessment: z.string(),
        positivePoints: z.array(z.string()),
        areasForImprovement: z.array(z.string()),
    }).optional(),
    isComplete: z.boolean(),
});

export type SimulationOutput = z.infer<typeof SimulationOutputSchema>;
