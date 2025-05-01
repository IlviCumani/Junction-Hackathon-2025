import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	FormMessage,
	FormControl,
	FormDescription,
	FormLabel,
	FormItem,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FormRadioProps extends GeneralProps {
	label: string;
	options: {
		value: string;
		label: string;
	}[];
	description?: string;
	field?: {
		value: string;
		onChange: (value: string) => void;
	};
	containerClassName?: string;
	orientation?: "horizontal" | "vertical";
}

function FormRadio({
	name,
	label,
	options,
	className,
	description,
	field,
	containerClassName,
	orientation = "vertical",
}: FormRadioProps) {
	return (
		<>
			<FormControl>
				<div className={cn("flex flex-col gap-4", containerClassName)}>
					<FormLabel htmlFor={name}>{label}</FormLabel>
					<RadioGroup
						className={cn(
							orientation === "horizontal" ? "flex items-center gap-4" : "",
						)}
						onValueChange={(val) => {
							if (field) {
								field.onChange(val);
							}
						}}
						value={field?.value || options[0].value}
					>
						{options.map((option) => {
							return (
								<FormItem key={option.value}>
									<div
										className={cn("flex items-center gap-2", className)}
										key={option.value}
									>
										<RadioGroupItem
											value={option.value}
											id={option.value}
										></RadioGroupItem>
										<Label htmlFor={option.value}>{option.label}</Label>
									</div>
								</FormItem>
							);
						})}
					</RadioGroup>
				</div>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}
const Component = withFormController(FormRadio, {
	hideLabel: true,
});

export default Component;
