import { Form as CNF } from "../ui/form";
import useForm from "./context/useForm";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { PropsWithChildren } from "react";

import FormInput from "./Items/Input";
import FormNumberInput from "./Items/NumberInput";
import FormPhoneInput from "./Items/Phone";
import FormTextArea from "./Items/TextArea";
import FormCheckbox from "./Items/Checkbox";
import FormRadio from "./Items/Radio";
import FormSelect from "./Items/Select";
import MultiSelect from "./Items/MultiSelect";
import FormDatePicker from "./Items/DatePicker";
import FormFileUpload from "./Items/FileUpload";
import FormSlider from "./Items/Slider";

type FormPropTypes<T extends FieldValues, K> = {
	onSubmit: (data: K) => void;
	autoComplete?: boolean;
	form: UseFormReturn;
	defaultValues?: T;
};

export default function Form<T extends FieldValues, K>({
	children,
	onSubmit,
	autoComplete,
	form,
}: PropsWithChildren<FormPropTypes<T, K>>) {
	function handleSubmit() {
		onSubmit(form.getValues() as K);
	}

	return (
		<CNF {...form}>
			<form
				autoComplete={autoComplete ? "on" : "off"}
				onSubmit={form.handleSubmit(handleSubmit)}
				noValidate
			>
				{children}
			</form>
		</CNF>
	);
}

Form.useForm = useForm;
Form.Input = FormInput;
Form.Number = FormNumberInput;
Form.TextArea = FormTextArea;
Form.Checkbox = FormCheckbox;
Form.Select = FormSelect;
Form.Radio = FormRadio;
Form.DatePicker = FormDatePicker;
Form.FileUpload = FormFileUpload;
Form.MultiSelect = MultiSelect;
Form.Phone = FormPhoneInput;
Form.Slider = FormSlider;
