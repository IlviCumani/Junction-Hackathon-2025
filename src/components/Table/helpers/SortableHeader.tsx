import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowDown01, ArrowDownAZ, ArrowUp01, ArrowUpAZ } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SortableHeaderProps<TData> {
	column: Column<TData, unknown>;
	label: string;
	isNumber?: boolean;
}

export default function SortableHeader<TData>({
	column,
	label,
	isNumber = false,
}: SortableHeaderProps<TData>) {
	const { t } = useTranslation();

	let icon = undefined;

	if (isNumber) {
		icon = column.getIsSorted() === "asc" ? <ArrowDown01 /> : <ArrowUp01 />;
	} else {
		icon = column.getIsSorted() === "asc" ? <ArrowDownAZ /> : <ArrowUpAZ />;
	}

	return (
		<Button
			variant="ghost"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			className="flex  p-0 m-0 gap-1"
		>
			{t(label)}

			{icon}
		</Button>
	);
}
