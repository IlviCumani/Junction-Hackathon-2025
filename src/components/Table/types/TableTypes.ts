import { ColumnDef } from "@tanstack/react-table";

export interface BaseTableType<T> {
	columns: ColumnDef<T>[];
	data: T[];
}

export interface TableProps<T> extends BaseTableType<T> {
	expandedContent?: React.ReactNode;
	stickyHeader?: boolean;
	noPagination?: boolean;
	density?: "compact" | "standard" | "flexible";
	isLoading?: boolean;
}
