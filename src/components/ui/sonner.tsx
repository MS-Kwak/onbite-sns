/**
 * @file sonner.tsx
 * @description shadcn/ui 토스트 알림 컴포넌트
 *
 * Sonner 라이브러리를 사용한 토스트 알림 컴포넌트입니다.
 * 테마에 따라 자동으로 스타일이 변경됩니다.
 *
 * @see https://ui.shadcn.com/docs/components/sonner
 */

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
