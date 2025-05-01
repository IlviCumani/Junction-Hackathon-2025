import Table from "@/components/Table";
import { useHttp } from "@/hooks/use-http";
import { useEffect, useState } from "react";
import useColumns from "./useColumns";

type dummyData = {
	email: string;
	phone_number: string;
};

export default function ForgetPasswordPage() {
	const [data, setData] = useState<dummyData[]>([]);
	const { isLoading, sendRequest } = useHttp();
	const columns = useColumns();

	useEffect(() => {}, []);

	return (
		<div className="">
			<Table data={data} columns={columns} isLoading={isLoading} noPagination />
		</div>
	);
}
