'use client';

interface OrderStatusTrackerProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const STEPS = [
  { key: 'pending', label: 'Order Placed', icon: '📋' },
  { key: 'processing', label: 'Processing', icon: '⚙️' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '✓' },
] as const;

export default function OrderStatusTracker({ status }: OrderStatusTrackerProps) {
  if (status === 'cancelled') {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xs">
        <p className="text-sm font-medium text-red-700 dark:text-red-400">Order Cancelled</p>
        <p className="text-xs text-red-600 dark:text-red-500 mt-1">This order has been cancelled. Contact support for assistance.</p>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-[2px] bg-neutral-200 dark:bg-neutral-700" />
        <div
          className="absolute top-5 left-0 h-[2px] bg-neutral-900 dark:bg-white transition-all duration-700"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, index) => {
          const isComplete = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="relative flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 ${
                  isComplete
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-black shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500'
                } ${isCurrent ? 'ring-4 ring-neutral-900/20 dark:ring-white/20 scale-110' : ''}`}
              >
                {isComplete && index < currentIndex ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span className="text-xs">{step.icon}</span>
                )}
              </div>
              <p
                className={`mt-2 text-[11px] tracking-wider uppercase font-medium text-center ${
                  isComplete
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
