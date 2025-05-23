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
		image: string;
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

	const fetchOrders = () => {
		sendRequest(useHttp.GET("orders/bartender"), (response: Order[]) => {
			setOrders(response);
		});
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	if (isLoading) {
		return <Loader className="h-screen" />;
	}

	return (
		<div className="w-full px-4 py-10">
			<h1 className="text-3xl font-bold mb-2 w-full text-center">Orders</h1>
			<Separator className="mb-6" />

			<div className="flex justify-center">
				<div className="flex flex-wrap justify-start gap-6 w-full max-w-screen-lg">
					{orders.map((order) => (
						<OrderCard
							key={order.id}
							order={{
								order_id: order.id,
								creation_date: order.creation_date,
								total_price: order.total_price,
								order_items: order.order_items,
							}}
							refetchOrders={fetchOrders}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
