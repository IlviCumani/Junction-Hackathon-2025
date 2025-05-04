import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useHttp } from "@/hooks/use-http";
import { Loader } from "@/components/Shared/Loader";
import Order from "./components/Order";
import GiftCard from "./components/GiftCard";

// Updated User type
type User = {
	id: number;
	email: string;
	phone_number: string;
	first_name: string;
	last_name: string;
	birthday: string;
	loyalty_points: number;
	registered_date: string;
};

// Updated OrderType to match new structure
type OrderType = {
	order_id: number;
	creation_date: string;
	total_price: number;
	order_items: {
		total_ammount: number;
		total_price: number;
		product: {
			name: string;
		};
		order_options?: {
			ammount: number;
			option: {
				name: string;
				base_price: number;
			};
		}[];
	}[];
};

type GiftCardType = {
	id: number;
	from_first_name: string;
	from_last_name: string;
	total_ammount: number;
	current_ammount: number;
	message: string;
	creation_date: string;
};

export default function Profile() {
	const [user, setUser] = useState<User | null>(null);
	const [orders, setOrders] = useState<OrderType[]>([]);
	const [giftCards, setGiftCards] = useState<GiftCardType[]>([]);
	const { isLoading, sendRequest } = useHttp();
	const navigate = useNavigate();

	useEffect(() => {
		sendRequest(useHttp.GET("user/profile"), (response: User) => setUser(response));
		sendRequest(useHttp.GET("user/orders"), (response: OrderType[]) => setOrders(response));
		sendRequest(useHttp.GET("user/giftcards"), (response: GiftCardType[]) =>
			setGiftCards(response),
		);
	}, []);

	if (isLoading || !user) {
		return <Loader className="h-screen" />;
	}

	return (
		<div className="max-w-5xl mx-auto w-full px-4 space-y-12 py-8">
			{/* User Info Section */}
			<section>
				<h2 className="text-2xl font-semibold mb-2">My Information</h2>
				<p className="text-muted-foreground">Basic details associated with your account.</p>
				<Separator className="my-4" />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
					<div>
						<span className="font-medium">First Name:</span> {user.first_name}
					</div>
					<div>
						<span className="font-medium">Last Name:</span> {user.last_name}
					</div>
					<div>
						<span className="font-medium">Email:</span> {user.email}
					</div>
					<div>
						<span className="font-medium">Phone Number:</span> {user.phone_number}
					</div>
					<div>
						<span className="font-medium">Birthday:</span> {user.birthday}
					</div>
					<div>
						<span className="font-medium">Member Since:</span> {user.registered_date}
					</div>
				</div>
			</section>

			{/* Loyalty Points Section */}
			<section className="border rounded-lg p-6">
				<h2 className="text-xl font-semibold mb-2">Loyalty Points</h2>
				<p className="text-muted-foreground font-semibold text-xl">{user.loyalty_points}</p>
				<Button onClick={() => navigate("/loyalty")}>Go to Loyalty Page</Button>
			</section>

			{/* Orders Section */}
			<section>
				<h2 className="text-2xl font-semibold mb-2">My Orders</h2>
				<p className="text-muted-foreground">Review your previous orders.</p>
				<Separator className="my-4" />
				<div className="space-y-4">
					{orders.length === 0 ? (
						<p className="text-muted-foreground">No orders found.</p>
					) : (
						orders.map((order) => <Order key={order.order_id} order={order} />)
					)}
				</div>
			</section>

			{/* Gift Cards Section */}
			<section>
				<h2 className="text-2xl font-semibold mb-2">My Gift Cards</h2>
				<p className="text-muted-foreground">Gift cards currently in your account.</p>
				<Separator className="my-4" />
				<div className="grid gap-4 sm:grid-cols-2">
					{giftCards.length === 0 ? (
						<p className="text-muted-foreground">No gift cards available.</p>
					) : (
						giftCards.map((giftCard) => (
							<GiftCard key={giftCard.id} giftCard={giftCard} />
						))
					)}
				</div>
			</section>
		</div>
	);
}
