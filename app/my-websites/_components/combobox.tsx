import { cn } from "@/lib/utils";
import { Check, ChevronDownIcon } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { flagComponentsMap } from "@/constants/languages";

interface Option {
  value: string;
  label: string;
}

interface ComboboxProps {
  options: Option[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  popoverOpen: boolean;
  setPopoverOpen: (open: boolean) => void;
}
export const Combobox = ({
  options,
  label,
  value,
  onChange,
  placeholder,
  popoverOpen,
  setPopoverOpen,
}: ComboboxProps) => {
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={popoverOpen}
            className="w-full justify-between"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronDownIcon className="size-5 text-[#667085] stroke-2" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const FlagComponent = flagComponentsMap[option.flagCode];
              return (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setPopoverOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    {FlagComponent && <FlagComponent className="h-4 w-4" />}
                    <span>{option.label}</span>
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
