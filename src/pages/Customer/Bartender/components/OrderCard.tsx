import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";

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
	order_id: number;
	creation_date: string;
	total_price: number;
	order_items: OrderItem[];
};

type OrderCardProps = {
	order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
	return (
		<Card className="mb-6 shadow-md w-80 flex flex-col">
			<CardHeader className="pt-4 pb-2 px-5 font-semibold text-lg">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
							<Coffee className="h-5 w-5" />
						</div>
						<span>Order #{order.order_id}</span>
					</div>
					<span className="text-sm text-muted-foreground">
						{new Date(order.creation_date).toLocaleDateString()}
					</span>
				</div>
			</CardHeader>

			<CardContent className="flex-1 space-y-4 px-5">
				{order.order_items.map((item, index) => (
					<div key={index} className="flex flex-col gap-3 border rounded-xl p-4">
						<div className="flex gap-4 items-center">
							<img
								src={"http://172.20.10.3:8000/"+item.product.image}
								alt={item.product.name}
								className="w-20 h-20 rounded-lg object-cover"
							/>
							<div className="flex-1">
								<p className="text-base font-medium">{item.product.name}</p>
								<p className="text-sm text-muted-foreground">
									Quantity: {item.total_ammount}
								</p>
								<p className="text-sm text-muted-foreground">
									Price: ${item.total_price}
								</p>
							</div>
						</div>

						{item.order_options && item.order_options.length > 0 && (
							<div className="pl-4 border-l-2 border-muted space-y-1">
								<p className="font-semibold text-sm text-muted-foreground">Options:</p>
								{item.order_options.map((opt, idx) => (
									<div key={idx} className="text-sm text-muted-foreground">
										• {opt.option.name} — {opt.ammount}ml (${opt.option.base_price})
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</CardContent>

			<CardFooter className="flex justify-between items-center px-5 pt-2 pb-4">
				<p className="text-lg font-semibold">Total: ${order.total_price}</p>
				<Button className="text-sm">Finish Order</Button>
			</CardFooter>
		</Card>
	);
}
