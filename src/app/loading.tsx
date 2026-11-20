import React from 'react';
import { Loader } from '@/components/ui/loader';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <Loader
        size="lg"
        tone="dark"
        label="Loading Ramesh Kolhu Wale…"
      />
    </div>
  );
}
