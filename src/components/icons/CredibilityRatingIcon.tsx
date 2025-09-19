import { cn } from '@/lib/utils';
import * as React from 'react';

type Props = {
  rating: 'High' | 'Medium' | 'Low';
} & React.SVGProps<SVGSVGElement>;

export function CredibilityRatingIcon({ rating, className, ...props }: Props) {
  const highOpacity = rating === 'High' ? 1 : 0.3;
  const mediumOpacity = rating === 'High' || rating === 'Medium' ? 1 : 0.3;
  const lowOpacity = 1;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-current', className)}
      {...props}
    >
      <rect
        x="2"
        y="10"
        width="3"
        height="4"
        rx="1"
        fill="currentColor"
        style={{ opacity: lowOpacity, transition: 'opacity 0.3s' }}
      />
      <rect
        x="6.5"
        y="6"
        width="3"
        height="8"
        rx="1"
        fill="currentColor"
        style={{ opacity: mediumOpacity, transition: 'opacity 0.3s' }}
      />
      <rect
        x="11"
        y="2"
        width="3"
        height="12"
        rx="1"
        fill="currentColor"
        style={{ opacity: highOpacity, transition: 'opacity 0.3s' }}
      />
    </svg>
  );
}
