import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { Input } from "@/components/ui/input";
import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { JSX, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import * as z from "zod";

type FormInputTypes = "password" | "email" | "url" | "hidden";

interface FormInputProps extends GeneralProps {
	type?: FormInputTypes;
	description?: string;
	placeholder?: string;
	required?: boolean;
	prefix?: JSX.Element | string;
	suffix?: JSX.Element | string;
	field?: {
		value: string;
		onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	};
}

const zodValidationSchema = {
	email: z.string().email({ message: "Invalid Email Address" }),
	password: z
		.string()
		.min(8, { message: "Password must have 8 characters" })
		.regex(/[A-Z]/, {
			message: "Password must contain an uppercase letter",
		})
		.regex(/\d/, {
			message: "Password must contain a number",
		}),
	url: z.string().url({ message: "Invalid URL" }),
	hidden: z.string(),
};

function validate(type: FormInputTypes | undefined, value: string): string | boolean {
	if (!type) return true;
	if (!value) return true;

	const message = zodValidationSchema[type].safeParse(value);

	return message.success ? true : message.error.errors[0].message;
}

function FormInput({
	name,
	label,
	type = undefined,
	prefix,
	suffix,
	className,
	description,
	placeholder,
	required = false,
	field,
}: FormInputProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const { register } = useFormContext();

	const [isPassword, isHardPassword] = useMemo(() => {
		const isPassword = type === "password" || type === "hidden";
		const isHardPassword = type === "password";

		return [isPassword, isHardPassword];
	}, [type]);

	const { invalid: error } = useFormField();

	function togglePasswordVisibility() {
		setShowPassword((prev) => !prev);
	}
	return (
		<>
			<FormControl>
				<Input
					{...register(name, {
						required: {
							value: required,
							message: `${label} is required`,
						},
						validate: (value) => validate(type || undefined, value),
					})}
					{...field}
					id={name}
					type={isPassword && !showPassword ? "password" : "text"}
					placeholder={placeholder ? placeholder : `${label}...`}
					className={cn("", className)}
					error={error}
					after={
						isPassword ? (
							<Button
								onClick={togglePasswordVisibility}
								variant={"ghost"}
								type="button"
								size={"icon"}
								className={error ? "text-destructive" : "text-muted-foreground"}
							>
								{!showPassword ? (
									<EyeOffIcon className="h-5 w-5" />
								) : (
									<EyeIcon className="h-5 w-5" />
								)}
							</Button>
						) : (
							suffix
						)
					}
					before={
						isHardPassword ? (
							<LockIcon
								className={cn(
									"h-5 w-5 ml-2",
									error ? "text-destructive" : "text-muted-foreground",
								)}
							/>
						) : (
							prefix
						)
					}
				/>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}

const Component = withFormController(FormInput);

export default Component;
