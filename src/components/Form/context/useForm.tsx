import { useEffect, useMemo } from "react";
import { useForm as useF } from "react-hook-form";

export default function useForm({ defaultValues = {} } = {}) {
	const form = useF({
		mode: "onTouched",
	});

	const nrOfFields = useMemo(() => Object.keys(defaultValues).length, [defaultValues]);

	useEffect(() => {
		const { setValue } = form;

		Object.entries(defaultValues).forEach(([key, value]) => {
			setValue(key, value);
		});
	}, [nrOfFields, defaultValues, form]);

	function resetForm() {
		const { reset } = form;
		Object.entries(defaultValues).forEach(([key, value]) => {
			reset({ [key]: value });
		});
	}

	return {
		...form,
		resetForm,
	};
}
