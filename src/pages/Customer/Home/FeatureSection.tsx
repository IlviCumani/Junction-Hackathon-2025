import { ShoppingCart, Gift, Calendar, QrCode } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

const features = [
	{
		title: "Custom Ordering",
		description:
			"Create your perfect drink with our customization options. Order ahead and skip the line!",
		icon: ShoppingCart,
		link: "/menu",
	},
	{
		title: "Gift Cards",
		description:
			"Send digital gift cards to friends and family. Perfect for birthdays and special occasions!",
		icon: Gift,
		link: "/gift",
	},
	{
		title: "Loyalty Program",
		description:
			"Earn points with every purchase. Redeem for free drinks, food items, and more!",
		icon: Calendar,
		link: "/loyalty",
	},
	{
		title: "Table Ordering",
		description:
			"Scan the QR code at your table to order without waiting in line. We'll bring it right to you!",
		icon: QrCode,
		link: "/table-order",
	},
];

const FeatureSection = () => {
	const navigate = useNavigate();
	return (
		<section className="py-12">
			<div className="container mx-auto px-4">
				<h2 className="text-2xl md:text-3xl font-bold text-center text-cafe-brown mb-8">
					Café Joy Experience
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{features.map((feature, index) => (
						<div
							key={index}
							className="group"
							onClick={() => {
								if (index !== 3) {
									navigate(feature.link);
								}
							}}
						>
							<Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-cafe-accent/30 cafe-card transform hover:scale-105">
								<CardHeader className="pb-2">
									<div className="w-12 h-12 rounded-full bg-cafe-cream flex items-center justify-center mb-3 group-hover:bg-cafe-accent/20 transition-colors">
										<feature.icon className="h-6 w-6 text-cafe-brown" />
									</div>
									<CardTitle className="text-xl text-cafe-brown">
										{feature.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-cafe-lightBrown">
										{feature.description}
									</CardDescription>
								</CardContent>
							</Card>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeatureSection;
