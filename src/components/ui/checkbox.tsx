"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
		icon?: React.JSX.Element;
		checkedClassName?: string;
	}
>(({ className, icon, checkedClassName = "", ...props }, ref) => {
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				icon
					? "peer group"
					: "peer h-4 w-4 shrink-0 rounded-[4px] border border-primary shadow-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				className,
			)}
			{...props}
		>
			{icon && <span className="group-data-[state=checked]:hidden">{icon}</span>}
			{icon ? (
				<CheckboxPrimitive.Indicator asChild>
					{React.cloneElement(icon, {
						className: cn(
							icon.props.className,
							"fill-primary stroke-primary",
							checkedClassName,
						),
					})}
				</CheckboxPrimitive.Indicator>
			) : (
				<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
					<Check className="h-4 w-4" />
				</CheckboxPrimitive.Indicator>
			)}
		</CheckboxPrimitive.Root>
	);
});
Checkbox.displayName = "Checkbox";

const CardCheckbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, ref) => {
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				"relative ring-[1px] ring-border rounded-lg px-4 py-3 text-start text-muted-foreground data-[state=checked]:ring-2 data-[state=checked]:ring-primary data-[state=checked]:text-primary",
				className,
			)}
			{...props}
		>
			{children}
			<CheckboxPrimitive.Indicator className="absolute top-2 right-2">
				<CircleCheck className="fill-primary text-primary-foreground" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
});
CardCheckbox.displayName = "CardCheckbox";

export { Checkbox, CardCheckbox };
