import * as React from "react";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react"; // Assuming lucide-react is used for icons

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: LucideIcon; // Icon prop to pass the desired icon
};

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {/* If icon is passed, render the icon inside the input */}
        {Icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-4 w-4 text-gray-500" />
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            Icon ? "pl-10" : "px-3", // Adjust padding if icon is present
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputWithIcon.displayName = "Input";

export { InputWithIcon };
