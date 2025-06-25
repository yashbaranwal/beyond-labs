import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type PriceInputProps = {
  icon?: ReactNode
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border border-gray file:text-foreground placeholder:text-foreground/40 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-r-sm bg-transparent px-3 py-1 text-sm text-foreground/60 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "group-hover:ring-[3px] group-hover:ring-primary/7 group-hover:border-primary/7 group-hover:border-l-0",
        "focus-visible:border focus-visible:border-gray focus-visible:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-0",
        "aria-invalid:ring-0 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export function PriceInput({
  icon = (
    <div className={cn("flex h-9 items-center justify-center rounded-l-sm border border-r-0 border-gray px-3 text-base font-normal text-muted",
      "group-hover:ring-[3px] group-hover:ring-primary/7 group-hover:border-primary/7",
      "focus-visible:border focus-visible:border-gray focus-visible:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-0",
    )
    }>
      $
    </div>
  ),
  className,
  ...props
}: PriceInputProps) {
  return (
    <div className={cn("flex items-center group transition-colors"
    )}>
      {icon}
      <Input
        {...props}
        className={cn("flex-1", className)}
      />
    </div>
  )
}
