import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-[var(--radius-200)] border border-solid border-[length:var(--sds-size-stroke-border,1px)] bg-[var(--color-background-default-default)] px-[var(--spacing-400)] py-[var(--spacing-300)] text-[length:var(--text-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--color-text-default-tertiary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border-brand-default)] disabled:cursor-not-allowed disabled:bg-[var(--color-background-disabled-default)] disabled:border-[var(--color-border-disabled-default)] disabled:text-[var(--color-text-disabled-on-disabled)]",
  {
    variants: {
      variant: {
        default: "border-[var(--color-border-default-default)]",
        error: "border-[var(--color-border-danger-default)] focus-visible:ring-[var(--color-border-danger-default)] text-[var(--color-text-danger-default)]",
      },
      size: {
        medium: "min-h-[48px]",
        small: "min-h-[32px] px-[var(--spacing-300)] py-[var(--spacing-200)] text-[length:var(--text-body-size-small)]",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "medium"
    }
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    hasError?: boolean;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant: hasError ? "error" : variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
