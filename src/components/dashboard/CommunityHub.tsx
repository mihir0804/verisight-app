import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, CalendarDays } from 'lucide-react';

export default function CommunityHub() {
  const events = [
    {
      icon: <Newspaper className="h-5 w-5 text-accent" />,
      title: 'Nighttime road closures on SG Highway',
      description: 'Notice: closures for metro construction.',
    },
    {
      icon: <CalendarDays className="h-5 w-5 text-accent" />,
      title: "Early morning 'Yoga by the Lake'",
      description: 'Event: session at Kankaria lake.',
    },
  ];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <CardHeader>
        <CardTitle>Community Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">{event.icon}</div>
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
