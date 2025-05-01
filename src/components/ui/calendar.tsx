import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { format, setMonth } from "date-fns";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectScrollDownButton,
	SelectScrollUpButton,
} from "./select";

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: React.ComponentProps<typeof DayPicker>) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium hidden",
				nav: "flex items-center gap-1",
				nav_button: cn(
					buttonVariants({ variant: "outline" }),
					"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-x-1",
				head_row: "flex",
				head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: cn(
					"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
					props.mode === "range"
						? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
						: "[&:has([aria-selected])]:rounded-md",
				),
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"size-8 p-0 font-normal aria-selected:opacity-100",
				),
				day_range_start:
					"day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
				day_range_end:
					"day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
				day_selected:
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
				day_today: "bg-accent text-accent-foreground",
				day_outside:
					"day-outside text-muted-foreground aria-selected:text-muted-foreground",
				day_disabled: "text-muted-foreground opacity-50",
				day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
				day_hidden: "invisible",
				caption_dropdowns: "flex gap-1",
				...classNames,
			}}
			components={{
				IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
				Dropdown: ({ name }) => {
					const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } =
						useDayPicker();
					const { goToMonth, currentMonth } = useNavigation();

					if (name === "months") {
						const selectItems = Array.from({ length: 12 }, (_, i) => ({
							value: i.toString(),
							label: format(setMonth(new Date(), i), "MMMM"),
						}));

						return (
							<MonthYearSelect
								selectItems={selectItems}
								triggerText={format(currentMonth, "MMM")}
								onChange={(newValue) => {
									const newDate = new Date(currentMonth);
									newDate.setMonth(parseInt(newValue));
									goToMonth(newDate);
								}}
								value={currentMonth.getMonth().toString()}
							/>
						);
					} else if (name === "years") {
						const earliestYear =
							fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
						const latestYear =
							toYear || toMonth?.getFullYear() || toDate?.getFullYear();

						let selectItems: {
							value: string;
							label: string;
						}[] = [];

						if (earliestYear && latestYear) {
							const yearsLength = latestYear - earliestYear + 1;

							selectItems = Array.from({ length: yearsLength }, (_, i) => ({
								value: `${earliestYear + i}`,
								label: `${earliestYear + i}`,
							}));
						}

						return (
							<MonthYearSelect
								selectItems={selectItems}
								triggerText={currentMonth.getFullYear().toString()}
								onChange={(newValue) => {
									const newDate = new Date(currentMonth);
									newDate.setFullYear(parseInt(newValue));
									goToMonth(newDate);
								}}
								value={currentMonth.getFullYear().toString()}
							/>
						);
					}

					return null;
				},
				IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

type MonthYearSelectProps = {
	selectItems: { value: string; label: string }[];
	triggerText: string;
	value: string;
	onChange: (newValue: string) => void; //TODO fix any
};

function MonthYearSelect({ selectItems, triggerText, value, onChange }: MonthYearSelectProps) {
	return (
		<Select
			value={value}
			onValueChange={(value) => {
				onChange(value);
			}}
		>
			<SelectTrigger>{triggerText}</SelectTrigger>
			<SelectContent className="w-32 h-64">
				<SelectScrollUpButton />
				<SelectGroup>
					{selectItems.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
				<SelectScrollDownButton />
			</SelectContent>
		</Select>
	);
}
export { Calendar };
