import { flexRender } from "@tanstack/react-table";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { TableHead, TableHeader, TableRow, Table as Tab, TableBody, TableCell } from "../ui/table";
import React from "react";
import { TableProps, Meta } from "./types/TableTypes";
import useTable from "@/hooks/useTable";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "../Shared/Loader";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useSearchParams } from "react-router-dom";
import { useHttp } from "@/hooks/use-http";
import Select from "../Shared/Select/Select";

export const PAGESIZE = "limit";
export const PAGE = "page";

const PAGE_SIZES = [10, 20, 50, 100];

export default function Table<T>({
	data,
	columns,
	stickyHeader,
	noPagination = false,
	expandedContent,
	// isLoading,
	fetchData = () => {},
	endpoint,
	density = "standard",
}: PropsWithChildren<TableProps<T>>) {
	const { table } = useTable({ data, columns });
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = parseInt(searchParams.get(PAGE) || "1");
	const pageSize = parseInt(searchParams.get(PAGESIZE) || "10");
	const { sendRequest, isLoading } = useHttp();
	const [metaData, setMetaData] = useState<Meta | undefined>(undefined);

	useEffect(() => {
		if (currentPage > (metaData?.total_pages || 0)) {
			const currentParams = new URLSearchParams(window.location.search);
			currentParams.set(PAGE, metaData?.total_pages?.toString() || "1");
			setSearchParams(currentParams);
		}
	}, [pageSize, currentPage, metaData, setSearchParams]);

	const hasNext = useMemo(() => {
		const totalPages = metaData?.total_pages || 1;
		return currentPage < totalPages;
	}, [currentPage, metaData?.total_pages]);

	const hasPrevious = useMemo(() => {
		const currentPage = parseInt(searchParams.get(PAGE) || "1");

		return currentPage > 1;
	}, [searchParams]);

	function handlePageSizeChange(pageSize: number) {
		const currentParams = new URLSearchParams(window.location.search);
		currentParams.set(PAGESIZE, pageSize.toString());
		setSearchParams(currentParams);

		table.setPageSize(pageSize);
		onPaginationChange(currentParams.toString());
	}

	function handleChangePage(page: number) {
		const currentParams = new URLSearchParams(window.location.search);

		const currentPage = parseInt(currentParams.get(PAGE) || "1");

		currentParams.set(PAGE, (currentPage + page).toString());
		setSearchParams(currentParams);
		onPaginationChange(currentParams.toString());
	}

	function onPaginationChange(params: string) {
		sendRequest(
			useHttp.GET(`${endpoint}${params.toString() ? `?${params.toString()}` : ``}`),
			(response: any) => {
				fetchData(response);
				setMetaData(response?.meta);
			},
		);
	}

	useEffect(() => {
		if (!noPagination) {
			const currentParams = new URLSearchParams(window.location.search);
			if (!searchParams.has(PAGE)) {
				currentParams.set(PAGE, "1");
				setSearchParams(currentParams);
			}

			if (!searchParams.has(PAGESIZE)) {
				currentParams.set(PAGESIZE, "10");
				setSearchParams(currentParams);
			} else {
				table.setPageSize(Number(searchParams.get(PAGESIZE)));
			}

			onPaginationChange(currentParams.toString());
		} else {
			table.setPageSize(data.length);
		}
	}, [noPagination, data.length]);

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
													{typeof expandedContent === "function"
														? expandedContent()
														: expandedContent}
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
			{!noPagination && (
				<>
					<Separator />
					<div className="flex items-center justify-between space-x-2  p-3">
						<div className=" ">
							<Select
								defaultValue={
									searchParams.get(PAGESIZE) || PAGE_SIZES[0].toString()
								}
								options={PAGE_SIZES.map((size) => {
									return {
										label: `Page size ${size}`,
										value: `${size}`,
									};
								})}
								onChange={(value) => {
									table.setPageSize(Number(value));
									handlePageSizeChange(Number(value));
								}}
							></Select>
						</div>

						<div className="gap-2 items-center flex">
							<Button
								variant="outline"
								size="icon"
								onClick={() => {
									handleChangePage(-1);
								}}
								disabled={!hasPrevious}
							>
								<ChevronLeft size={18} />
							</Button>
							{table.getPageCount() ? (
								<Badge variant="secondary" className="h-9 ">
									{`Page ${searchParams.get(PAGE)} of ${
										metaData?.total_pages || 1
									}`}
								</Badge>
							) : null}
							<Button
								variant="outline"
								size="icon"
								onClick={() => {
									handleChangePage(1);
								}}
								disabled={!hasNext}
							>
								<ChevronRight size={18} />
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
