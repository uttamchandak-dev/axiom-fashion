'use client';

import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className={className}>
      {/* Tab headers */}
      <div className="flex gap-8 border-b border-neutral-100" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'pb-3 text-sm tracking-[0.05em] transition-colors duration-300 relative',
              activeTab === tab.id
                ? 'text-primary'
                : 'text-muted hover:text-primary'
            )}
          >
            {tab.label}
            {/* Active indicator */}
            <span
              className={cn(
                'absolute bottom-0 left-0 right-0 h-px bg-primary transition-transform duration-300 origin-left',
                activeTab === tab.id ? 'scale-x-100' : 'scale-x-0'
              )}
            />
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-6" role="tabpanel">
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
