import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border border-gray placeholder:text-foreground/40 dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md bg-transparent px-3 py-2 text-sm text-foreground/60 font-medium transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:ring-[3px] hover:ring-primary/7 hover:border-primary/7",
        "focus-visible:border focus-visible:border-gray focus-visible:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus-visible:ring-0",
        "aria-invalid:ring-0 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
