/**
 * Skeleton component for loading states
 * Provides animated placeholder content
 */
import { cn } from "@/lib/utils"

// Skeleton component with animation
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
