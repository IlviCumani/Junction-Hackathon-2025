import { FormItem as SFI, FormField, FormLabel } from "@/components/ui/form";
import { JSX } from "react";
import { useFormContext, FieldValues, ControllerRenderProps } from "react-hook-form";

type FormItemPropTypes = {
	name: string;
	label: string | JSX.Element;
	required?: boolean;
	hideLabel?: boolean;
	children: (field: ControllerRenderProps<FieldValues, string>) => JSX.Element;
	defaultValue?: string | boolean;
};

type configType = {
	hideLabel?: boolean;
};

function FormItem({ name, children, label, required, hideLabel = false }: FormItemPropTypes) {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<SFI className="mb-4 h-full">
					{!hideLabel && (
						<FormLabel className="space-x-2 flex ml-2 overflow-hidden" htmlFor={name}>
							<span className="truncate">{label}</span>
							{required && <span className="text-destructive">*</span>}
						</FormLabel>
					)}
					{children(field)}
				</SFI>
			)}
		/>
	);
}

export default function withFormController<
	T extends {
		name: string;
		label: string;
		required?: boolean;
	},
>(
	WrappedComponent: React.FC<T>,
	config: configType = {
		hideLabel: false,
	},
) {
	return function FormInputController(props: T) {
		return (
			<FormItem
				name={props.name}
				label={props.label}
				required={props.required || false}
				hideLabel={config.hideLabel}
			>
				{(field) => <WrappedComponent {...props} field={field} />}
			</FormItem>
		);
	};
}
