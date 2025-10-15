'use server';

/**
 * @fileOverview A flow for summarizing trending tech articles and providing insightful commentary.
 *
 * - summarizeTrendingTechArticle - A function that summarizes trending tech articles and provides commentary.
 * - SummarizeTrendingTechArticleInput - The input type for the summarizeTrendingTechArticle function.
 * - SummarizeTrendingTechArticleOutput - The return type for the summarizeTrendingTechArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTrendingTechArticleInputSchema = z.object({
  articleTitle: z.string().describe('The title of the trending tech article.'),
  articleContent: z.string().describe('The content of the trending tech article.'),
});
export type SummarizeTrendingTechArticleInput = z.infer<typeof SummarizeTrendingTechArticleInputSchema>;

const SummarizeTrendingTechArticleOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the trending tech article.'),
  commentary: z.string().describe('Insightful commentary relevant to Huxleigh\u2019s expertise.'),
});
export type SummarizeTrendingTechArticleOutput = z.infer<typeof SummarizeTrendingTechArticleOutputSchema>;

export async function summarizeTrendingTechArticle(
  input: SummarizeTrendingTechArticleInput
): Promise<SummarizeTrendingTechArticleOutput> {
  return summarizeTrendingTechArticleFlow(input);
}

const summarizeTrendingTechArticlePrompt = ai.definePrompt({
  name: 'summarizeTrendingTechArticlePrompt',
  input: {schema: SummarizeTrendingTechArticleInputSchema},
  output: {schema: SummarizeTrendingTechArticleOutputSchema},
  prompt: `You are an AI expert working for Huxleigh. Your task is to summarize a trending tech article and provide insightful commentary relevant to Huxleigh's expertise.

Article Title: {{{articleTitle}}}
Article Content: {{{articleContent}}}

Summary:
Commentary: `,
});

const summarizeTrendingTechArticleFlow = ai.defineFlow(
  {
    name: 'summarizeTrendingTechArticleFlow',
    inputSchema: SummarizeTrendingTechArticleInputSchema,
    outputSchema: SummarizeTrendingTechArticleOutputSchema,
  },
  async input => {
    const {output} = await summarizeTrendingTechArticlePrompt(input);
    return output!;
  }
);
