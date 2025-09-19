'use server';
/**
 * @fileOverview An AI-powered credibility assessment flow.
 *
 * - assessClaimCredibility - A function that assesses the credibility of a claim.
 * - AssessClaimCredibilityInput - The input type for the assessClaimCredibility function.
 * - AssessClaimCredibilityOutput - The return type for the assessClaimCredibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessClaimCredibilityInputSchema = z.object({
  claim: z.string().describe('The claim to assess.'),
});
export type AssessClaimCredibilityInput = z.infer<
  typeof AssessClaimCredibilityInputSchema
>;

const AssessClaimCredibilityOutputSchema = z.object({
  verdict: z
    .enum(['Verified', 'Misleading', 'False'])
    .describe('The verdict of the claim.'),
  supportingEvidence: z
    .array(
      z.object({
        source: z.string().describe('The source of the evidence.'),
        credibility: z
          .enum(['High', 'Medium', 'Low'])
          .describe('The credibility rating of the source.'),
        evidence: z.string().describe('The evidence itself.'),
      })
    )
    .describe('The supporting evidence for the verdict.'),
});
export type AssessClaimCredibilityOutput = z.infer<
  typeof AssessClaimCredibilityOutputSchema
>;

export async function assessClaimCredibility(
  input: AssessClaimCredibilityInput
): Promise<AssessClaimCredibilityOutput> {
  return assessClaimCredibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessClaimCredibilityPrompt',
  input: {schema: AssessClaimCredibilityInputSchema},
  output: {schema: AssessClaimCredibilityOutputSchema},
  prompt: `You are an AI assistant designed to assess the credibility of claims.

You will be provided with a claim and your task is to determine whether the claim is Verified, Misleading, or False based on supporting evidence.

You must provide a verdict and a list of supporting evidence with the source and credibility rating for each piece of evidence.

Claim: {{{claim}}}

Your response should be formatted as a JSON object that adheres to the following schema:
${JSON.stringify(AssessClaimCredibilityOutputSchema.shape, null, 2)}`,
});

const assessClaimCredibilityFlow = ai.defineFlow(
  {
    name: 'assessClaimCredibilityFlow',
    inputSchema: AssessClaimCredibilityInputSchema,
    outputSchema: AssessClaimCredibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
