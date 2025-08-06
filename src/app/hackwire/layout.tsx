import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hackwire - AI-Powered News System',
  description: 'Real-time news aggregation with AI monologue generation and OBS streaming integration',
  keywords: ['news', 'AI', 'streaming', 'OBS', 'real-time', 'hackwire'],
};

export default function HackwireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hackwire-layout">
      {children}
    </div>
  );
}