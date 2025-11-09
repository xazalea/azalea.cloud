'use client';

import { TerminalWindow } from '@/components/TerminalWindow';

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-black">
      <TerminalWindow windowId="standalone-terminal" />
    </div>
  );
}

