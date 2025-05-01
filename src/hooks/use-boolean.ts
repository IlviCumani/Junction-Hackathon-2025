import { useState, useCallback } from "react";

type UseBooleanReturn = {
	value: boolean;
	setValue: React.Dispatch<React.SetStateAction<boolean>>;
	setTrue: () => void;
	setFalse: () => void;
	toggle: () => void;
};

export function useBoolean(defaultValue = false): UseBooleanReturn {
	if (typeof defaultValue !== "boolean") {
		throw new Error("defaultValue must be `true` or `false`");
	}
    
	const [value, setValue] = useState(defaultValue);

	const setTrue = useCallback(() => {
		setValue(true);
	}, []);

	const setFalse = useCallback(() => {
		setValue(false);
	}, []);

	const toggle = useCallback(() => {
		setValue((x: boolean) => !x);
	}, []);

	return { value, setValue, setTrue, setFalse, toggle };
}
