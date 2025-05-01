import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandInput,
	CommandEmpty,
	CommandItem,
	CommandGroup,
	CommandList,
} from "@/components/ui/command";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps extends GeneralProps {
	description?: string;
	required?: boolean;
	options: { value: string | number; label: string | ReactNode }[];
	placeholder?: string;
	field?: {
		value: string[];
		onChange: (value: string[]) => void;
	};
	hideInput?: boolean;
}

function MultiSelect({
	name,
	label,
	options,
	description,
	required = false,
	className,
	hideInput = false,
	placeholder,
	field,
}: MultiSelectProps) {
	const { register } = useFormContext();
	const { invalid: error } = useFormField();

	let filteredOptions;

	if (field?.value) {
		filteredOptions = options.filter(
			(option) => !field.value.includes(option.value.toString()),
		);
	} else {
		filteredOptions = options;
	}

	useEffect(() => {
		if (field?.value) {
			register(name, {
				required: {
					value: required,
					message: `${label} is required`,
				},
			});
		}
	}, [field?.value, name, register, required, label]);

	return (
		<>
			<FormControl>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"dark:bg-transparent hover:bg-background flex items-center h-max",
								error && "border-destructive text-destructive",
								className,
							)}
						>
							{(field?.value || []).length > 0 ? (
								<div className="flex flex-wrap gap-2 items-center">
									{field?.value.map((value) => {
										const option = options.find(
											(option) => option.value === value,
										);
										return (
											<Badge
												key={value}
												className="mr-2 cursor-pointer "
												onClick={(e) => {
													e.stopPropagation();
													field?.onChange(
														field?.value.filter((v) => v !== value),
													);
												}}
											>
												{option?.label}
												<X className="ml-2 h-4 w-4" />
											</Badge>
										);
									})}
								</div>
							) : (
								<span className="text-muted-foreground">
									{placeholder || `${label}...`}
								</span>
							)}

							<ChevronDown className="ml-auto h-4 w-4 text-muted-foreground self-baseline mt-1" />
						</Button>
					</PopoverTrigger>
					<PopoverContent align="start" className="w-full">
						<Command>
							{!hideInput && (
								<CommandInput placeholder="Type a command or search..." />
							)}
							<CommandList>
								<CommandGroup>
									{filteredOptions.map((option) => (
										<CommandItem
											key={option.value}
											onSelect={() => {
												field?.onChange([
													...(field?.value || []),
													option.value as string,
												]);
											}}
										>
											{option.label}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													field?.value?.includes(option.value.toString())
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
								<CommandEmpty>No results found.</CommandEmpty>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage></FormMessage>
		</>
	);
}

const Component = withFormController(MultiSelect);

export default Component;
