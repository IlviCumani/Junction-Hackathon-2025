import withFormController from "../FormItem";
import { GeneralProps } from "../types/GeneralProps";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { FormMessage, FormControl, FormDescription } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface FormSliderProps extends GeneralProps {
	description?: string;
	field?: {
		value: number;
		onChange: (value: number) => void;
	};
	max?: number;
}

function FormSlider({ description, field, className, max }: FormSliderProps) {
	return (
		<>
			<FormControl>
				<div className="flex gap-2 items-center mt-2">
					<Slider
						className={cn(className)}
						value={[field?.value || 0]}
						onValueChange={(val) => {
							if (field) {
								field.onChange(val[0]);
							}
						}}
						max={max}
					/>
					<Label className="whitespace-nowrap">{`${field?.value || 0} %`}</Label>
				</div>
			</FormControl>
			{description && <FormDescription>{description}</FormDescription>}
			<FormMessage />
		</>
	);
}

const Component = withFormController(FormSlider);

export default Component;
