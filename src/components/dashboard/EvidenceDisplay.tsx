import { type AssessClaimCredibilityOutput } from '@/ai/flows/ai-powered-credibility-assessment';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, XCircle, Globe, Building, Users } from 'lucide-react';
import { CredibilityRatingIcon } from '../icons/CredibilityRatingIcon';

type VerdictInfo = {
  [key: string]: {
    icon: React.ReactNode;
    label: string;
    className: string;
  };
};

const verdictInfo: VerdictInfo = {
  Verified: {
    icon: <CheckCircle2 className="h-6 w-6" />,
    label: 'Verified',
    className: 'bg-verdict-verified/20 text-verdict-verified border-verdict-verified/30',
  },
  Misleading: {
    icon: <AlertTriangle className="h-6 w-6" />,
    label: 'Misleading',
    className: 'bg-verdict-misleading/20 text-verdict-misleading border-verdict-misleading/30',
  },
  False: {
    icon: <XCircle className="h-6 w-6" />,
    label: 'False',
    className: 'bg-verdict-false/20 text-verdict-false border-verdict-false/30',
  },
};

const sourceIcons: { [key: string]: React.ReactNode } = {
  'News Outlet': <Globe className="h-4 w-4 text-muted-foreground" />,
  'Official Government Source': <Building className="h-4 w-4 text-muted-foreground" />,
  'Community Forum': <Users className="h-4 w-4 text-muted-foreground" />,
};

type EvidenceDisplayProps = {
  result: AssessClaimCredibilityOutput;
};

export default function EvidenceDisplay({ result }: EvidenceDisplayProps) {
  const verdict = verdictInfo[result.verdict] || verdictInfo.Misleading;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Verdict</h3>
        <div className={`flex items-center gap-3 rounded-lg border p-4 ${verdict.className}`}>
          {verdict.icon}
          <span className="text-xl font-bold">{verdict.label}</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Supporting Evidence</h3>
        <div className="space-y-4">
          {result.supportingEvidence.map((evidence, index) => (
            <Card key={index} className="bg-card/70">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {sourceIcons[evidence.source] || <Globe className="h-4 w-4 text-muted-foreground" />}
                    <CardTitle className="text-base">{evidence.source}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CredibilityRatingIcon rating={evidence.credibility} />
                    <span>{evidence.credibility} Credibility</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 italic">"{evidence.evidence}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
