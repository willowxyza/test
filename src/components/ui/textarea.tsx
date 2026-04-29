import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-[var(--radius-200)] border border-solid border-[length:var(--sds-size-stroke-border,1px)] bg-[var(--color-background-default-default)] px-[var(--spacing-400)] py-[var(--spacing-300)] text-[length:var(--text-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] transition-colors placeholder:text-[var(--color-text-default-tertiary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-brand-default)] disabled:cursor-not-allowed disabled:bg-[var(--color-background-disabled-default)] disabled:border-[var(--color-border-disabled-default)] disabled:text-[var(--color-text-disabled-on-disabled)] resize-y",
          hasError 
            ? "border-[var(--color-border-danger-default)] focus-visible:ring-[var(--color-border-danger-default)] text-[var(--color-text-danger-default)]" 
            : "border-[var(--color-border-default-default)]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
