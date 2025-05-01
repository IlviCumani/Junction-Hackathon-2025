import { ColumnDef } from "@tanstack/react-table";

type Column = () => ColumnDef<{
	email: string;
	phone_number: string;
}>[];

const useColumns: Column = () => {
	return [
		{
			accessorKey: "email",
			header: "Email",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				return <span>{value}</span>;
			},
		},
		{
			accessorKey: "phone_number",
			header: "Phone Number",
			cell: ({ getValue }) => {
				const value = getValue() as string;
				return <span>{value}</span>;
			},
		},
	];
};

export default useColumns;
