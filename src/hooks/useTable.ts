import { BaseTableType } from "../components/Table/types/TableTypes";
import { useState } from "react";
import {
	SortingState,
	ColumnFiltersState,
	VisibilityState,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	ExpandedState,
	getExpandedRowModel,
} from "@tanstack/react-table";

function useTable<T>({ data, columns }: BaseTableType<T>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

	const table = useReactTable({
		data,
		columns,
		autoResetPageIndex: false,
		state: { sorting, columnFilters, columnVisibility, rowSelection, expanded },
		onExpandedChange: setExpanded,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
	});

	return { table };
}

export default useTable;
