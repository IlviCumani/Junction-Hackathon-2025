import { ColumnDef } from "@tanstack/react-table";
import { JSX } from "react";

export interface BaseTableType<T> {
	columns: ColumnDef<T>[];
	data: T[];
}

export interface TableProps<T> extends BaseTableType<T> {
	expandedContent?: React.ReactNode | JSX.Element | (() => JSX.Element);
	stickyHeader?: boolean;
	noPagination?: boolean;
	density?: "compact" | "standard" | "flexible";
	isLoading?: boolean;
	fetchData?: (response: any) => void;
	endpoint?: string;
}

export type Meta = {
	current_page: number;
	total_pages: number;
	total_items: number;
	next: number | null;
	previous: number | null;
};
