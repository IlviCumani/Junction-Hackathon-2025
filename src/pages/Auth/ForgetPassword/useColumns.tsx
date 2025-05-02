import { ColumnDef } from "@tanstack/react-table";
import { ExpandableCol } from "@/components/Table/helpers";
type Column = () => ColumnDef<{
	email: string;
	password: string;
}>[];

const useColumns: Column = () => {
	return [
		ExpandableCol(),
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				return <span>{value}</span>;
			},
		},
		{
			accessorKey: "password",
			header: "Phone Number",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				return <span>{value}</span>;
			},
		},
	];
};

export default useColumns;
