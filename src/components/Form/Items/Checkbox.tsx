import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { Checkbox, CardCheckbox } from "@/components/ui/checkbox";
import { FormMessage, FormControl, FormDescription, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { JSX } from "react";

import { useFormContext } from "react-hook-form";

interface FormCheckboxProps extends GeneralProps {
	icon?: JSX.Element;
	description?: string;
	containerClassName?: string;
	isCard?: boolean;
	field?: {
		value: boolean;
		onChange: (value: boolean) => void;
	};
}

function FormCheckbox({
	name,
	label,
	icon,
	className,
	description,
	isCard,
	containerClassName,
	field,
}: FormCheckboxProps) {
	const { register } = useFormContext();

	if (isCard) {
		return (
			<FormControl>
				<CardCheckbox
					{...register(name)}
					className={cn(className)}
					checked={field!.value}
					onCheckedChange={field!.onChange}
				>
					<>
						<div className="flex items-center gap-2 mr-8">
							<FormLabel htmlFor={name}>{label}</FormLabel>
							{icon}
						</div>
						{description && <FormDescription>{description}</FormDescription>}
					</>
				</CardCheckbox>
			</FormControl>
		);
	} else {
		return (
			<>
				<div className={cn("flex items-center gap-2", containerClassName)}>
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<FormControl>
						<Checkbox
							{...register(name)}
							className={cn(className)}
							id={name}
							checked={field!.value}
							onCheckedChange={field!.onChange}
							icon={icon}
						/>
					</FormControl>
				</div>
				{description && <FormDescription>{description}</FormDescription>}
				<FormMessage />
			</>
		);
	}
}

const Component = withFormController(FormCheckbox, {
	hideLabel: true,
});

export default Component;
