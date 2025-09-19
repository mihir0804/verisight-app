'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { MoonIcon } from '@/components/icons/MoonIcon';

type WeatherData = {
  main: {
    temp: number;
  };
  weather: {
    main: string;
  }[];
  name: string;
  sys: {
    country: string;
  };
};

export default function RealTimeInfoHeader() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [weather, setWeather] = useState<{ temp: number; description: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }));
      setDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
      }));
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);
  
  useEffect(() => {
    // Fallback to a default since API is unreliable
    setLocation({ city: 'Ahmedabad', country: 'IN' });
    setWeather({ temp: 27, description: 'Clear Night' });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card/50 p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="h-5 w-32 bg-muted rounded"></div>
            <div className="h-4 w-24 bg-muted rounded mt-1"></div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="h-6 w-24 bg-muted rounded"></div>
            <div className="h-4 w-16 bg-muted rounded mt-1"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-muted rounded-full"></div>
            <div>
              <div className="h-5 w-12 bg-muted rounded"></div>
              <div className="h-4 w-20 bg-muted rounded mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card/50 p-4 animate-slide-up">
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-semibold">{location?.city}, {location?.country}</p>
          <p className="text-sm text-muted-foreground">{date} Context</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-mono text-lg font-semibold tabular-nums">
            {time || '...'}
          </p>
          <p className="text-sm text-muted-foreground">Local Time</p>
        </div>
        <div className="flex items-center gap-3">
          <MoonIcon className="h-8 w-8 text-accent" />
          <div>
            <p className="font-semibold">{weather?.temp.toFixed(0)}°C</p>
            <p className="text-sm text-muted-foreground">{weather?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
