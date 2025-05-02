import Table from "@/components/Table";
import { useState } from "react";
import useColumns from "./useColumns";

type dummyData = {
	email: string;
	password: string;
};

export default function ForgetPasswordPage() {
	const [data, setData] = useState<dummyData[]>([]);

	const columns = useColumns();

	return (
		<div className="">
			<Table
				data={data}
				columns={columns}
				endpoint="get/users"
				expandedContent={<div className="h-40">Expanded Content</div>}
				fetchData={(response: { data: dummyData[] }) => {
					setData(response.data);
				}}
			/>
		</div>
	);
}
