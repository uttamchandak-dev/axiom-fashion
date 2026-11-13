import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  caption?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  caption,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {caption && (
        <p className="text-caption text-muted mb-3">{caption}</p>
      )}
      <h2 className="text-headline">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-muted font-light max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
