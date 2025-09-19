'use server';

import {
  assessClaimCredibility,
  AssessClaimCredibilityInput,
  AssessClaimCredibilityOutput,
} from '@/ai/flows/ai-powered-credibility-assessment';
import { useToast } from '@/hooks/use-toast';

export async function verifyClaim(
  input: AssessClaimCredibilityInput
): Promise<{ data?: AssessClaimCredibilityOutput; error?: string }> {
  try {
    // In a real application, you might have more complex logic here.
    // For this demo, we'll simulate a slight delay to make the forensic scan more visible.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const data = await assessClaimCredibility(input);
    return { data };
  } catch (error) {
    console.error('Error verifying claim:', error);
    return { error: 'Failed to assess credibility due to an internal error. Please try again later.' };
  }
}
