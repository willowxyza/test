import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-200)] text-[length:var(--text-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-[var(--color-background-disabled-default)] disabled:text-[var(--color-text-disabled-on-disabled)] disabled:border-[var(--color-border-disabled-default)] border-solid border-[length:var(--sds-size-stroke-border,1px)] overflow-clip shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-background-brand-default)] text-[var(--color-text-brand-on-brand)] border-[var(--color-border-brand-default)] hover:bg-[var(--color-background-brand-hover)]",
        neutral:
          "bg-[var(--color-background-neutral-tertiary)] text-[var(--color-text-default-default)] border-[var(--color-border-neutral-secondary)] hover:bg-[var(--color-background-neutral-tertiary-hover)]",
        subtle:
          "bg-transparent text-[var(--color-text-neutral-default)] border-transparent hover:border-[var(--color-border-default-default)]",
        danger:
          "bg-[var(--color-background-danger-default)] text-[var(--color-text-danger-on-danger)] border-[var(--color-border-danger-default)] hover:bg-[var(--color-background-danger-hover)]",
      },
      size: {
        medium: "h-[40px] px-[var(--spacing-300)] gap-[var(--spacing-200)]",
        small: "h-[32px] px-[var(--spacing-200)] gap-[var(--spacing-200)] text-[length:var(--text-body-size-small)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  iconStart?: React.ReactNode
  iconEnd?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, iconStart, iconEnd, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconStart && <span className="shrink-0 size-[16px] flex items-center justify-center">{iconStart}</span>}
        {children && <span>{children}</span>}
        {iconEnd && <span className="shrink-0 size-[16px] flex items-center justify-center">{iconEnd}</span>}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
