import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { Input } from "./input"

type PriceInputProps = {
  icon?: ReactNode
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function PriceInput({
  icon = (
    <div className="flex h-9 items-center justify-center rounded-l-md border border-r-0 border-input px-3 text-base font-normal text-muted">
      $
    </div>
  ),
  className,
  ...props
}: PriceInputProps) {
  return (
    <div className="flex items-center">
      {icon}
      <Input
        {...props}
        className={cn("flex-1 rounded-l-none focus-visible:z-10", className)}
      />
    </div>
  )
}
