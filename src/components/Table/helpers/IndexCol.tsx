import { ColumnDef } from "@tanstack/react-table";

const IndexCol = <T,>(): ColumnDef<T> => ({
	accessorKey: "index",
	header: () => (
		<div>
			<span className="ml-4">#</span>
		</div>
	),
	cell: ({ row }) => {
		const { index } = row;
		return <div className="ml-4">{index + 1}</div>;
	},
});

export default IndexCol;
