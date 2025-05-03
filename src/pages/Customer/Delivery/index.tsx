import { Separator } from "@/components/ui/separator";
import ProductCard from "./components/ProductCard";

const mockData = [
	{
		category_id: 1,
		category_name: "Coffee 1",
		items: [
			{
				id: 1,
				name: "Coffee 1",
				price: 10.0,
				image: "https://www.royalcupcoffee.com/sites/default/files/images/blog/AdobeStock_159183621update.jpg",
				description:
					"Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			},
			{
				id: 2,
				name: "Coffee 2",
				price: 20.0,
				image: "https://www.royalcupcoffee.com/sites/default/files/images/blog/AdobeStock_159183621update.jpg",
				description:
					"Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			},
		],
	},
	{
		category_id: 2,
		category_name: "Coffee 2",
		items: [
			{
				id: 3,
				name: "Coffee 3",
				price: 30.0,
				image: "https://www.royalcupcoffee.com/sites/default/files/images/blog/AdobeStock_159183621update.jpg",
				description:
					"Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			},
			{
				id: 4,
				name: "Coffee 4",
				price: 40.0,
				image: "https://www.royalcupcoffee.com/sites/default/files/images/blog/AdobeStock_159183621update.jpg",
				description:
					"Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			},
			{
				id: 5,
				name: "Coffee 5",
				price: 50.0,
				image: "https://www.royalcupcoffee.com/sites/default/files/images/blog/AdobeStock_159183621update.jpg",
				description:
					"Product Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
			},
		],
	},
];

export default function Delivery({}) {
	return (
		<div className="w-full max-w-7xl mx-auto px-4">
			{mockData.map((category) => (
				<div key={category.category_id} className="mb-16">
					<h2 className="text-2xl font-semibold ">{category.category_name}</h2>
					<h5 className="text-muted-foreground">DESCRIPTIOn</h5>
					<Separator className="my-4 w-full" />
					<div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]">
						{category.items.map((item) => (
							<ProductCard
								key={item.id}
								id={item.id}
								title={item.name}
								description={item.description}
								image={item.image}
								price={item.price}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
