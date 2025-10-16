
import { z } from 'zod';

export const TrainingMessageSchema = z.object({
    role: z.enum(['user', 'ai']),
    content: z.string(),
});

export const TrainingFeedbackSchema = z.object({
    overallAssessment: z.string().describe("A brief, overall assessment of the user's performance in the simulation."),
    positivePoints: z.array(z.string()).describe("A list of specific things the user did well."),
    areasForImprovement: z.array(z.string()).describe("A list of specific areas where the user could improve."),
});
