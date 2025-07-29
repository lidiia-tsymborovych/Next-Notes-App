import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex w-full rounded-md border border-[var(--input-border)] bg-white px-3 py-2 text-sm sm:text-[16px] text-[var(--foreground)] placeholder:text-sm sm:placeholder:text-[16px] outline-none transition-colors',
        'hover:border-[var(--input-ring)]',
        'focus:ring-1 focus:ring-[var(--input-ring)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Textarea }
