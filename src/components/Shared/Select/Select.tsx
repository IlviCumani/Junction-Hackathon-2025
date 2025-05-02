import {
	Select as SelectComponent,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem as SI,
	SelectGroup,
} from "@/components/ui/select";
import { PropsWithChildren, useEffect, useState } from "react";
import Loader from "../../Shared/Loader/Loader";
import type { SelectOptionItem } from "@/types/ComponentTypes/Options";
import { cn } from "@/lib/utils";

export type SwitchProps = {
	id?: string;
	options: SelectOptionItem[];
	defaultValue?: string | number;
	onChange?: (value: string | number) => void;
	isLoading?: boolean;
	className?: string;
	disabled?: boolean;
	placeholder?: string;
};

export default function Select({
	id,
	options = [],
	defaultValue,
	onChange,
	isLoading,
	disabled,
	className,
	placeholder,
}: SwitchProps) {
	const [value, setValue] = useState<string | number | undefined>();

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		} else {
			if (!placeholder) setValue(options[0]?.value);
		}
	}, [defaultValue, options, placeholder]);

	function handleChange(value: string) {
		setValue(value);
		onChange?.(value);
	}

	return (
		<SelectComponent value={value?.toString()} onValueChange={handleChange}>
			<SelectTrigger
				className={cn("flex-1 space-x-2", className)}
				id={id}
				disabled={isLoading || disabled}
			>
				<SelectValue placeholder={placeholder}></SelectValue>
				{isLoading && <Loader size={17} />}
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((option) => (
						<SI key={option.value} value={option.value.toString()}>
							{option.label}
						</SI>
					))}
				</SelectGroup>
			</SelectContent>
		</SelectComponent>
	);
}

function SelectItem({
	children,
	text,
}: PropsWithChildren<{
	text: string;
}>) {
	return (
		<div className="flex items-center">
			{children}
			<span className="ml-2">{text}</span>
		</div>
	);
}

Select.Item = SelectItem;
