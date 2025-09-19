'use client';

import { useState } from 'react';
import { type AssessClaimCredibilityOutput } from '@/ai/flows/ai-powered-credibility-assessment';
import { verifyClaim } from '@/app/actions/verifyClaim';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import ForensicScanAnimation from './ForensicScanAnimation';
import EvidenceDisplay from './EvidenceDisplay';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export default function ClaimVerification() {
  const [claim, setClaim] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssessClaimCredibilityOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claim.trim()) {
      toast({
        title: 'Error',
        description: 'Claim cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);
    const res = await verifyClaim({ claim });
    if (res.error) {
      setError(res.error);
      toast({
        title: 'Verification Failed',
        description: res.error,
        variant: 'destructive',
      });
    } else if (res.data) {
      setResult(res.data);
    }
    setIsLoading(false);
  };

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
      <CardHeader>
        <CardTitle>Credibility Assessment</CardTitle>
        <CardDescription>
          Enter a claim from social media, news, or a message to verify its credibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerification} className="space-y-4">
          <Textarea
            placeholder="Paste a claim here... e.g., 'A new metro line will open next month in Ahmedabad.'"
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" />
            Verify Claim
          </Button>
        </form>

        <div className="mt-6">
          {isLoading && <ForensicScanAnimation />}
          {error && !isLoading && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {result && !isLoading && <EvidenceDisplay result={result} />}
        </div>
      </CardContent>
    </Card>
  );
}
