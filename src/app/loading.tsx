export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      {/* Brand-aligned minimal loading spinner */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 border-t-2 border-neutral-900 dark:border-white rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-2 border-neutral-400 dark:border-neutral-500 rounded-full animate-spin shadow-sm" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <span className="text-[8px] tracking-[0.3em] font-medium uppercase text-neutral-900 dark:text-white absolute">
          AXM
        </span>
      </div>
      <p className="mt-6 text-[10px] tracking-widest uppercase text-neutral-500 dark:text-neutral-400 animate-pulse">
        Curating Experience...
      </p>
    </div>
  );
}
