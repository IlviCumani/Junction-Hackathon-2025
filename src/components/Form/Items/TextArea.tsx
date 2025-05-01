import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { Textarea } from "@/components/ui/textarea";

import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormTextAreaProps extends GeneralProps {
	description?: string;
	placeholder?: string;
	required?: boolean;
	maxLength?: number;
	field?: {
		value: string;
		onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	};
	rows?: number;
}

function FormTextArea({
	name,
	label,
	description,
	placeholder,
	required,
	maxLength,
	field,
	className,
	rows = 5,
}: FormTextAreaProps) {
	const { register } = useFormContext();
	
	const { invalid: error } = useFormField();

	return (
		<>
			<FormControl>
				<Textarea
					id={name}
					{...field}
					{...register(name, {
						required: {
							value: !!required,
							message: `${label} is required.`,
						},
						maxLength: {
							value: maxLength || Number.MAX_SAFE_INTEGER,
							message: `${label} must not exceed ${maxLength} characters.`,
						},
					})}
					placeholder={placeholder ? placeholder : `${label}...`}
					className={cn(
						error ? "ring-destructive border-destructive " : "text-muted-foreground",
						className,
					)}
					rows={rows}
				/>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}

const Component = withFormController(FormTextArea);

export default Component;
