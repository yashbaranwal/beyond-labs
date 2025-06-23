import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-foreground/40 hover:ring-[3px] hover:ring-primary/7 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border border-gray flex h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-sm text-foreground/60 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border focus-visible:ring-gray focus-visible:ring-[1px]",
        "aria-invalid:ring-0 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
