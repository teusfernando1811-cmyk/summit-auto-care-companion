import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const btn = cva(
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.14em] font-semibold text-sm transition-colors duration-200 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60",
  {
    variants: {
      variant: {
        accent: "bg-accent text-accent-foreground hover:bg-navy",
        navy: "bg-navy text-on-navy hover:bg-accent",
        outline: "border border-navy text-navy hover:bg-navy hover:text-on-navy",
        ghostLight: "border border-on-navy/50 text-on-navy hover:bg-on-navy hover:text-navy",
        link: "text-navy underline-offset-8 decoration-accent decoration-2 hover:underline px-0",
      },
      size: { md: "h-12 px-6", lg: "h-14 px-8", sm: "h-10 px-4 text-xs" },
    },
    defaultVariants: { variant: "accent", size: "md" },
  },
);
export type BtnProps = VariantProps<typeof btn>;
export const btnClass = (p: BtnProps & { className?: string }) => cn(btn(p), p.className);
