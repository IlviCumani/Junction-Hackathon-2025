import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { Input } from "@/components/ui/input";

import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
import { JSX } from "react";

type FormNumberTypes = "positive" | "negative" | "decimal" | "percentage" | "integer";

interface FormInputProps extends GeneralProps {
	type?: FormNumberTypes[];
	description?: string;
	placeholder?: string;
	required?: boolean;
	className?: string;
	prefix?: JSX.Element | string;
	suffix?: JSX.Element | string;
	min?: number;
	max?: number;
	field?: {
		value: string;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	};
}

const zodValidationSchema = {
	positive: z.number().positive({ message: "Number must be positive" }),
	negative: z.number().negative({ message: "Number must be negative" }),
	percentage: z.number().min(0).max(100, { message: "Number must be between 0 and 100" }),
	integer: z.number().int({ message: "Number must be an integer" }),
	decimal: z.number(),
};

function validate(types: FormNumberTypes[] | [], value: string) {
	if (!types.length) return true;
	if (!value) return true;

	const valueAsNumber = parseFloat(value);

	if (isNaN(valueAsNumber)) {
		return "Number is required";
	}

	for (const type of types) {
		const message = zodValidationSchema[type].safeParse(valueAsNumber);

		if (!message.success) {
			return message.error.errors[0].message;
		}
	}

	return true;
}

function FormNumberInput({
	name,
	label,
	type = [],
	prefix,
	className,
	suffix,
	description,
	placeholder,
	required,
	min = NaN,
	max = NaN,
	field,
}: FormInputProps) {
	const { register } = useFormContext();
	const { invalid: error } = useFormField();

	return (
		<>
			<FormControl>
				<Input
					{...register(name, {
						required: {
							value: !!required,
							message: `${label} is required`,
						},
						validate: (value) => validate(type, value),
						min: {
							value: min,
							message: `Number must be greater than ${min}`,
						},
						max: {
							value: max,
							message: `Number must be less than ${max}`,
						},
					})}
					{...{ field }}
					id={name}
					placeholder={placeholder ? placeholder : `${label}...`}
					className={cn("text-foreground", className)}
					error={error}
					after={suffix}
					before={prefix}
				/>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}

const Component = withFormController(FormNumberInput);

export default Component;
