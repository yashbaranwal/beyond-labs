import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type PriceInputProps = {
  icon?: ReactNode;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-l border-l-gray file:text-foreground placeholder:text-foreground/40 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-9 w-full min-w-0 rounded-r-sm bg-transparent px-3 py-1 text-sm text-foreground/60 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "group-hover:border-l group-hover:border-l-primary/7",
        "aria-invalid:ring-0 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export function PriceInput({
  icon = (
    <div
      className={cn(
        "flex h-9 items-center justify-center px-3 text-base font-normal text-muted"
      )}
    >
      $
    </div>
  ),
  className,
  ...props
}: PriceInputProps) {
  return (
    <div
      className={cn(
        "border border-gray rounded-sm group flex items-center transition-colors",
        "hover:ring-[3px] hover:ring-primary/7 hover:border-primary/7",
      )}
    >
      {icon}
      <Input {...props} className={cn("flex-1", className)} />
    </div>
  );
}
