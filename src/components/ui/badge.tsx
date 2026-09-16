import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-600 text-white hover:bg-indigo-700",
        secondary:
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200",
        destructive:
          "border-transparent bg-rose-500 text-white hover:bg-rose-600",
        outline: "text-slate-800 border-slate-300",
        success:
          "border-transparent bg-emerald-100 text-emerald-800 border-emerald-200 font-medium",
        warning:
          "border-transparent bg-amber-100 text-amber-800 border-amber-200 font-medium",
        kipk:
          "border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold shadow-sm",
        info:
          "border-transparent bg-sky-100 text-sky-800 border-sky-200 font-medium",
        purple:
          "border-transparent bg-purple-100 text-purple-800 border-purple-200 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
