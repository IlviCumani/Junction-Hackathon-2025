import { flexRender } from "@tanstack/react-table";
import { PropsWithChildren, useEffect } from "react";
import { TableHead, TableHeader, TableRow, Table as Tab, TableBody, TableCell } from "../ui/table";
import React from "react";
import { TableProps } from "./types/TableTypes";
import useTable from "@/hooks/useTable";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "../Shared/Loader";
import { SearchX } from "lucide-react";

export default function Table<T>({
	data,
	columns,
	stickyHeader,
	noPagination = false,
	expandedContent,
	isLoading,
	density = "compact",
}: PropsWithChildren<TableProps<T>>) {
	const { table } = useTable({ data, columns });

	useEffect(() => {
		table.setPageSize(noPagination ? data.length : 10);
	}, [data, noPagination, table]);

	return (
		<div
			className={cn(
				"rounded-md border ",
				stickyHeader ? "[&>div]:max-h-[410px] overflow-hidden" : " ",
			)}
		>
			<Tab
				className={cn({
					"[&_td]:py-2 [&_th]:py-1": density === "compact",
					"[&_td]:py-3 [&_th]:py-2": density === "standard",
					"[&_td]:py-4 [&_th]:py-2": density === "flexible",
				})}
			>
				<TableHeader className="font-bold">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className={cn(
								stickyHeader &&
									"[&>*]:whitespace-nowrap sticky top-0 bg-background z-50 rounded-t-xl",
							)}
						>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody className="p-1 overflow-y-hidden relative">
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<React.Fragment key={row.id}>
								<TableRow className="py-4">
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className="">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>

								<AnimatePresence>
									{row.getIsExpanded() && (
										<TableRow>
											<TableCell
												colSpan={table.getAllColumns().length}
												className="p-0"
											>
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{
														duration: 0.3,
														ease: "easeInOut",
													}}
												>
													{expandedContent}
												</motion.div>
											</TableCell>
										</TableRow>
									)}
								</AnimatePresence>
							</React.Fragment>
						))
					) : (
						<>
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className="text-center text-muted-foreground h-40"
								>
									{isLoading ? (
										<Loader />
									) : (
										<span className="flex flex-col items-center justify-center space-x-2">
											<SearchX />
											No data found
										</span>
									)}
								</TableCell>
							</TableRow>
						</>
					)}
				</TableBody>
			</Tab>
		</div>
	);
}
