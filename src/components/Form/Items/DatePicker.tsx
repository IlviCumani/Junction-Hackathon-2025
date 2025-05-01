import { cn } from "@/lib/utils";
import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormMessage, FormControl, FormDescription, useFormField } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CAL } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import type {
	SelectSingleEventHandler,
	SelectMultipleEventHandler,
	SelectRangeEventHandler,
} from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

type InputModes = "single" | "multiple" | "range";

interface FormDatepickerProps extends GeneralProps {
	mode?: InputModes;
	description?: string;
	placeholder?: string;
	required?: boolean;
	yearsBeforeToday?: number;
	yearsAfterToday?: number;
	field?: {
		value: Date | Date[] | { from: Date; to: Date };
		onChange: (value: Date | { from: Date; to: Date } | Date[]) => void;
	};
}

const DATE_FORMAT = "dd/MM/yyyy";

function FormDatepicker({
	name,
	label,
	mode = "single",
	description,
	placeholder,
	required = false,
	yearsBeforeToday = 10,
	yearsAfterToday = 10,
	field,
	className,
}: FormDatepickerProps) {
	const { register } = useFormContext();
	const { invalid: error } = useFormField();
	const isMobile = useIsMobile(480);

	const showPlaceholder = useMemo(() => {
		if (mode === "single") {
			return field?.value === undefined;
		} else if (mode === "multiple") {
			return (field?.value as Date[] | undefined)?.length === 0 || field?.value === undefined;
		} else {
			const range = field?.value as { from?: string; to?: string } | undefined;
			return !range?.from && !range?.to;
		}
	}, [field?.value, mode]);

	const isMultiple = mode === "multiple";

	useEffect(() => {
		if (field) {
			register(name, {
				required: required ? `The field "${label}" is required.` : false,
				validate: (value) => {
					if (mode === "multiple" && value.length === 0) {
						return "You must select at least one date.";
					}
					if (mode === "range" && (!value.from || !value.to)) {
						return "You must select a start and end date.";
					}
					return true;
				},
			});
		}
	}, [required, field, register, name, mode, label]);

	return (
		<>
			<FormControl>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={"outline"}
							className={cn(
								"flex items-center justify-start hover:bg-background h-max dark:bg-transparent text-foreground overflow-hidden",
								className,
								isMultiple ? "flex-wrap" : "flex-nowrap",
								error && "border-destructive text-destructive",
							)}
						>
							<CAL
								className={error ? "text-destructive" : "text-muted-foreground"}
								size={33}
							/>
							{showPlaceholder ? (
								<span className="text-muted-foreground">
									{placeholder ? placeholder : `${label}...`}
								</span>
							) : isMultiple ? (
								isMobile &&
								Array.isArray(field?.value) &&
								field?.value.length > 1 ? (
									<span>{`Selected (${field?.value.length})`}</span>
								) : (
									<>
										{field?.value !== undefined &&
											Array.isArray(field?.value) &&
											(field?.value as Date[]).map(
												(date: Date, index: number) => (
													<Badge key={index} className="">
														{format(date, DATE_FORMAT)}
													</Badge>
												),
											)}
									</>
								)
							) : (
								<span className="truncate">
									{mode === "single"
										? format(field?.value as Date, DATE_FORMAT)
										: `${format(
												(field?.value as { from: Date })?.from,
												DATE_FORMAT,
										  )} - ${
												(field?.value as { to: Date })?.to
													? format(
															(field?.value as { to: Date }).to,
															DATE_FORMAT,
													  )
													: ""
										  }`}
								</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent align="start" className="w-auto p-0">
						{mode === "single" && (
							<Calendar
								mode="single"
								selected={field!.value as Date}
								captionLayout="dropdown-buttons"
								onSelect={field!.onChange as SelectSingleEventHandler}
								numberOfMonths={1}
								fromYear={new Date().getFullYear() - yearsBeforeToday}
								toYear={new Date().getFullYear() + yearsAfterToday}
							/>
						)}
						{mode === "multiple" && (
							<Calendar
								mode="multiple"
								selected={field!.value as Date[]}
								captionLayout="dropdown-buttons"
								onSelect={field!.onChange as SelectMultipleEventHandler}
								numberOfMonths={1}
								fromYear={new Date().getFullYear() - yearsBeforeToday}
								toYear={new Date().getFullYear() + yearsAfterToday}
							/>
						)}
						{mode === "range" && (
							<Calendar
								mode="range"
								selected={field!.value as { from: Date; to: Date }}
								captionLayout="dropdown-buttons"
								onSelect={field!.onChange as SelectRangeEventHandler}
								numberOfMonths={2}
								fromYear={new Date().getFullYear() - yearsBeforeToday}
								toYear={new Date().getFullYear() + yearsAfterToday}
							/>
						)}
					</PopoverContent>
				</Popover>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}

const Component = withFormController(FormDatepicker);

export default Component;
