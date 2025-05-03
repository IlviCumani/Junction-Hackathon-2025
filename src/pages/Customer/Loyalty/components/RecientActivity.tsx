import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Table from "@/components/Table";
import useColumns from "./useColumns";
import { useEffect, useState } from "react";

type dataType = {
	id: number;
	date: string;
	description: string;
	type: string;
	points: number;
};

export default function RecentActivity() {
	const columns = useColumns();
	const [data, setData] = useState<dataType[]>([]);

	useEffect(() => {
		setData([
			{
				id: 1,
				date: "2023-10-01",
				description: "Purchase at Cafe",
				type: "Earned",
				points: 50,
			},
			{
				id: 2,
				date: "2023-10-02",
				description: "Redeemed for a coffee",
				type: "Redeemed",
				points: -100,
			},
			{
				id: 3,
				date: "2023-10-02",
				description: "Redeemed for a coffee",
				type: "Redeemed",
				points: -100,
			},
			{
				id: 4,
				date: "2023-10-02",
				description: "Redeemed for a coffee",
				type: "Redeemed",
				points: -100,
			},
		]);
	}, []);

	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent className=" align-middle">
				<Table data={data} columns={columns} noPagination></Table>
			</CardContent>
		</Card>
	);
}
