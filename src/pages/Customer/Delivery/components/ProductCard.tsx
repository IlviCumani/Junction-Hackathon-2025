import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Coffee, ShoppingCart } from "lucide-react";
import { useCartContext } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

type ProductCardProps = {
	id: number;
	image?: string;
	title?: string;
	description?: string;
	price?: number;
	stock?: number;
	onBtnClick?: any;
	isPopular: boolean;
};

export default function ProductCard({
	image = "https://www.royalcupcoffee.com/sites/default/files/images/blog/AdobeStock_159183621update.jpg",
	title = "Product Title",
	description = "Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	price = 10.0,
	id,
	onBtnClick,
	isPopular = false,
}: // stock = 10,
ProductCardProps) {
	const { addToCart } = useCartContext();
	return (
		<Card className="shadow-none relative">
			{isPopular && (
				<Badge className="absolute top-4 right-2 bg-green-600/10 dark:bg-green-600/20 hover:bg-green-600/10 text-green-500 border-green-600/60 shadow-none">
					Popular
				</Badge>
			)}
			<CardHeader className="pt-4 pb-4 px-5 flex-row items-center gap-3 font-semibold">
				<div>
					<div className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full">
						<Coffee className="h-5 w-5" />
					</div>
					{title}
				</div>
			</CardHeader>
			<CardContent className="text-[15px] text-muted-foreground px-5 ">
				<p>{description}</p>
				<div className="h-64 w-full mt-4 flex items-center justify-center overflow-hidden rounded-xl">
					<img src={image} className="w-auto h-full rounded-xl" />
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex-1">
					<p className="text-lg font-semibold">{`Price $${price}`}</p>
					<p className="text-sm text-muted-foreground">In Stock</p>
				</div>
				<Button
					className="/blocks"
					onClick={
						onBtnClick
							? onBtnClick
							: () => {
									addToCart({
										id,
										name: title,
										price,
										image,
										quantity: 1,
									});
							  }
					}
				>
					<ShoppingCart />
					Add to cart
				</Button>
			</CardFooter>
		</Card>
	);
}
