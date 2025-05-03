import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Column = () => ColumnDef<{
	date: string;
	description: string;
	type: string;
	points: number;
}>[];

const useColumns: Column = () => {
	return [
		{
			accessorKey: "date",
			header: "Date",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				return <span>{value}</span>;
			},
		},
		{
			accessorKey: "description",
			header: "Description",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				return <span>{value}</span>;
			},
		},
		{
			accessorKey: "type",
			header: "Type",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				const isEarned = value === "Earned";

				return (
					<Badge
						className={cn(
							isEarned
								? `bg-blue-500/30 flex  justify-center max-w-20 text-blue-500`
								: `bg-red-500/30 flex  justify-center max-w-20 text-red-500`,
						)}
					>
						{value}
					</Badge>
				);
			},
		},
		{
			accessorKey: "points",
			header: "Points",
			cell: ({ getValue }) => {
				const value = getValue() as number;
				return <span>{value}</span>;
			},
		},
	];
};

export default useColumns;
