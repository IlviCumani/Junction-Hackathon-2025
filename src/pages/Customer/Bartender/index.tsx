import { Separator } from "@/components/ui/separator";
import OrderCard from "./components/OrderCard";

const mockData = [
	{
		order_id: 1,
		creation_date: "2023-10-01",
		total_price: 100,
		order_items: [
			{
				total_ammount: 2,
				total_price: 10,
				product: {
					name: "Coffee",
					image: "https://example.com/coffee.jpg",
				},
			},
			{
				total_ammount: 1,
				total_price: 500,
				product: {
					name: "Custom Coffee",
					image: "https://example.com/customCofee.jpg",
				},
				order_options: [
					{
						ammount: 100,
						option: {
							name: "Kafe turke",
							base_price: 5,
						},
					},
					{
						ammount: 100,
						option: {
							name: "Qumesht",
							base_price: 10,
						},
					},
					{
						ammount: 100,
						option: {
							name: "Cokollate",
							base_price: 5,
						},
					},
					{
						ammount: 100,
						option: {
							name: "Kanelle",
							base_price: 5,
						},
					},
				],
			},
		],
	},
	{
		order_id: 2,
		creation_date: "2023-11-01",
		total_price: 100,
		order_items: [
			{
				total_ammount: 2,
				total_price: 10,
				product: {
					name: "Coffee",
					image: "https://example.com/coffee.jpg",
				},
			},
			{
				total_ammount: 1,
				total_price: 500,
				product: {
					name: "Custom Coffee",
					image: "https://example.com/customCofee.jpg",
				},
				order_options: [
					{
						ammount: 100,
						option: {
							name: "Kafe turke",
							base_price: 5,
						},
					},
					{
						ammount: 100,
						option: {
							name: "Qumesht",
							base_price: 10,
						},
					},
					{
						ammount: 100,
						option: {
							name: "Cokollate",
							base_price: 5,
						},
					},
					{
						ammount: 100,
						option: {
							name: "Kanelle",
							base_price: 5,
						},
					},
				],
			},
		],
	}
];

export default function Delivery() {
	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold mb-2">Orders</h1>
			<Separator className="mb-6" />
			
			<div className="space-y-10">
				{mockData.map((order) => (
					<OrderCard key={order.order_id} order={order} />
				))}
			</div>
		</div>
	);
}
