'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { MoonIcon } from '@/components/icons/MoonIcon';

export default function RealTimeInfoHeader() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [locationAvailable, setLocationAvailable] = useState(false);

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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationAvailable(true);
        },
        () => {
          setLocationAvailable(false);
        }
      );
    } else {
      setLocationAvailable(false);
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card/50 p-4 animate-slide-up">
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-semibold">{locationAvailable ? 'Local Context' : 'Location Not Available'}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
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
            <p className="font-semibold">--°C</p>
            <p className="text-sm text-muted-foreground">Weather N/A</p>
          </div>
        </div>
      </div>
    </div>
  );
}
