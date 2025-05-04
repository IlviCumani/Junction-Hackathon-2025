import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import OrderCard from "./components/OrderCard";
import { useHttp } from "@/hooks/use-http";
import { Loader } from "@/components/Shared/Loader";

type OrderOption = {
	ammount: number;
	option: {
		name: string;
		base_price: number;
	};
};

type OrderItem = {
	total_ammount: number;
	total_price: number;
	product: {
		name: string;
	};
	order_options?: OrderOption[];
};

type Order = {
	id: number;
	creation_date: string;
	total_price: number;
	order_items: OrderItem[];
};

export default function Delivery() {
	const [orders, setOrders] = useState<Order[]>([]);
	const { isLoading, sendRequest } = useHttp();

	useEffect(() => {
		sendRequest(useHttp.GET("orders/bartender"), (response: Order[]) => {
			setOrders(response);
		});
	}, [sendRequest]);

	if (isLoading) {
		return <Loader className="h-screen" />;
	}

	return (
		<div className="w-full px-4 py-10">
			{/* Orders header takes up the full width */}
			<h1 className="text-3xl font-bold mb-2 w-full text-center">Orders</h1>
			<Separator className="mb-6" />

			{/* Flex container centered horizontally */}
			<div className="flex justify-center">
				{/* Flex-wrap ensures the order cards flow into the next row when needed */}
				{/* Add `max-w-screen-lg` or similar to control the width */}
				<div className="flex flex-wrap justify-start gap-6 w-full max-w-screen-lg">
					{orders.map((order) => (
						<OrderCard
							key={order.id}
							order={{
								order_id: order.id,
								creation_date: order.creation_date,
								total_price: order.total_price,
								order_items: order.order_items.map((item) => ({
									...item,
									product: {
										...item.product,
										image: "https://via.placeholder.com/80", // Placeholder image
									},
								})),
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
