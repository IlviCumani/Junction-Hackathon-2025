import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { PhoneInput } from "@/components/ui/phone-input";
import { useFormContext } from "react-hook-form";
import * as RPNInput from "react-phone-number-input";
import * as z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

const zodValidationSchema = {
	phone: z
		.string()
		.refine(isValidPhoneNumber, { message: "Invalid phone number" })
		.or(z.literal("")),
};

function validate(value: string): string | boolean {
	if (!value) return true;

	const message = zodValidationSchema.phone.safeParse(value);

	return message.success ? true : message.error.errors[0].message;
}

interface FormPhoneProps extends GeneralProps {
	description?: string;
	placeholder?: string;
	required?: boolean;
	field?: {
		value: RPNInput.Value;
		onChange: (value: RPNInput.Value) => void;
	};
}

function Phone({
	name,
	label,
	className,
	description,
	placeholder,
	required = false,
	field,
}: FormPhoneProps) {
	const { register } = useFormContext();
	const { invalid: error } = useFormField();

	return (
		<>
			<FormControl>
				<PhoneInput
					placeholder={placeholder ? placeholder : `${label}...`}
					{...register(name, {
						required: {
							value: required,
							message: `${label} is required`,
						},
						validate: (value) => validate(value),
					})}
					{...(field ? field : {})}
					focusInputOnCountrySelection
					international
					className={cn(
						error ? "border-destructive border rounded-lg" : "border-gray-300",
					)}
				/>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}

const Component = withFormController(Phone);

export default Component;
