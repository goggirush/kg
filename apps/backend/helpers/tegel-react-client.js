import dynamic from 'next/dynamic';

export const TdsHeader = dynamic(
  () => import('@scania/tegel-react').then((mod) => mod.TdsHeader),
  { ssr: false }
);

export const TdsHeaderTitle = dynamic(
  () => import('@scania/tegel-react').then((mod) => mod.TdsHeaderTitle),
  { ssr: false }
);