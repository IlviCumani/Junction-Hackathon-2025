import { Button } from "@/components/ui/button";
import type { Row, Table, ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

type Cell<T> = {
	row: Row<T>;
	table: Table<T>;
};

const ExpandableCol = <T,>(openMultiple?: boolean): ColumnDef<T> => ({
	accessorKey: "expand",
	header: "",
	cell: ({ row, table }: Cell<T>) => {
		return (
			<Button
				variant="secondary"
				className="rounded-full flex items-center justify-center w-5 h-5 border-primary border"
				onClick={() => {
					const expanded = row.getIsExpanded();

					if (expanded) {
						row.toggleExpanded(false);
					} else {
						if (!openMultiple) {
							table.toggleAllRowsExpanded(false);
						}
						row.toggleExpanded(true);
					}
				}}
				size="icon"
			>
				<span
					className={`transition-transform duration-200 ease-in-out ${
						row.getIsExpanded() ? "rotate-180" : "rotate-0"
					}`}
				>
					<ChevronDown size={18} />
				</span>
			</Button>
		);
	},
});

export default ExpandableCol;
