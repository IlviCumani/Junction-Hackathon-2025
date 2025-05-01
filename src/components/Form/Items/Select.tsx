import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectTrigger,
	SelectValue,
	SelectScrollUpButton,
	SelectScrollDownButton,
	SelectGroup,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FormSelectProps extends GeneralProps {
	description?: string;
	required?: boolean;
	options: { value: string | number; label: string | ReactNode }[];
	placeholder?: string;
	field?: {
		value: string;
		onChange: (value: string) => void;
	};
}

function FormSelect({
	label,
	name,
	options,
	description,
	required = false,
	className,
	placeholder,
	field,
}: FormSelectProps) {
	const { register } = useFormContext();
	const { invalid: error } = useFormField();
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const filteredOptions = options.filter((option) => {
		const labelText =
			typeof option.label === "string"
				? option.label
				: option.label && typeof option.label === "object" && "props" in option.label
				? (option.label as { props: { children: ReactNode } }).props.children
				: "";

		return labelText?.toString().toLowerCase().includes(inputValue.toLowerCase());
	});

	return (
		<>
			<FormControl>
				<Select
					{...register(name, {
						required: {
							value: required,
							message: `${label} is required`,
						},
					})}
					value={field?.value}
					onValueChange={(value) => {
						field?.onChange(value);
					}}
				>
					<SelectTrigger
						className={cn(
							className,
							error &&
								"border-destructive focus-visible:ring-1 focus-visible:ring-destructive",
						)}
					>
						<SelectValue placeholder={placeholder || `${label}...`}></SelectValue>
					</SelectTrigger>

					<SelectContent className="max-h-56 h-fit">
						{filteredOptions.length > 10 && <SelectScrollUpButton />}
						<Input
							value={inputValue}
							onChange={handleInputChange}
							placeholder={"Search"}
							wrapperClassname="my-2"
							after={<Search className="text-muted-foreground mr-2" size={16} />}
						/>

						<SelectGroup>
							{filteredOptions.map((option, index) => (
								<SelectItem key={index} value={option.value.toString()}>
									{option.label}
								</SelectItem>
							))}
						</SelectGroup>
						{filteredOptions.length === 0 && <SelectScrollDownButton />}
					</SelectContent>
				</Select>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage></FormMessage>
		</>
	);
}

const Component = withFormController(FormSelect);

export default Component;
