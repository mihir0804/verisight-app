import RealTimeInfoHeader from '@/components/dashboard/RealTimeInfoHeader';
import CommunityHub from '@/components/dashboard/CommunityHub';
import ClaimVerification from '@/components/dashboard/ClaimVerification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Lightbulb className="w-6 h-6 mr-2 text-accent" />
          <h1 className="text-xl font-bold tracking-tighter">VeriSight</h1>
        </div>
      </header>
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <RealTimeInfoHeader />
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
            <div className="lg:col-span-2">
              <ClaimVerification />
            </div>
            <div className="lg:col-span-1">
              <CommunityHub />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
