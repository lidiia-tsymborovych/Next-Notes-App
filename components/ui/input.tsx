import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'flex h-12 w-full rounded-md border border-[var(--input-border)] bg-white px-3 text-sm sm:text-[16px] text-[var(--input-placeholder)] placeholder:text-sm sm:placeholder:text-[16px] outline-none transition-colors',
        'hover:border-[var(--input-ring)]',
        'focus:ring-1 focus:ring-[var(--input-ring)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        type === 'color' &&
          'cursor-pointer overflow-hidden p-0 border border-[var(--input-border)] bg-white w-10 h-10 rounded-md hover:border-[var(--input-ring)] focus:ring-2 focus:ring-[var(--input-ring)]',
        className
      )}
      {...props}
    />
  );
}

export { Input }
