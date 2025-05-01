import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	before?: React.ReactNode;
	after?: React.ReactNode;
	error?: boolean;
	wrapperClassname?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, wrapperClassname, type, before, after, error, ...props }, ref) => {
		if (before || after) {
			return (
				<div
					className={cn(
						"relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-0",
						error
							? "ring-destructive border-destructive focus-within:ring-destructive "
							: "",
						wrapperClassname,
					)}
				>
					{before && before}
					<input
						ref={ref}
						type={type}
						data-slot="input"
						className={cn(
							"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
							"border-0 focus-visible:ring-0 shadow-none text-foreground",
							className,
						)}
						{...props}
					/>
					{after && after}
				</div>
			);
		}

		return (
			<input
				ref={ref}
				type={type}
				data-slot="input"
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					error
						? "ring-destructive border-destructive focus-visible:ring-destructive"
						: "border border-input focus-visible:ring-ring",
					className,
				)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";

export { Input };
