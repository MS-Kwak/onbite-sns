/**
 * 📁 @file textarea.tsx
 * 📝 @description shadcn/ui 텍스트영역 컴포넌트
 *
 * 📄 여러 줄 텍스트 입력을 위한 컴포넌트입니다.
 * 📏 자동 높이 조절(field-sizing-content)을 지원합니다.
 *
 * 🔗 @see https://ui.shadcn.com/docs/components/textarea
 */

import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
