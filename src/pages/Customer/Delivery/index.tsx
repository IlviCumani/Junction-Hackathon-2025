import { Separator } from "@/components/ui/separator";
import ProductCard from "./components/ProductCard";
import { useEffect, useState } from "react";
import { useHttp } from "@/hooks/use-http";
import { Loader } from "@/components/Shared/Loader";

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

const BACKEND_URL = import.meta.env.REACT_APP_IMAGE;

type Category = {
	id: number;
	name: string;
	products: {
		id: number;
		name: string;
		base_price: number;
		image: string;
		description: string;
	}[];
};

export default function Delivery({}) {
	const [data, setData] = useState<Category[]>([]);

	const { isLoading, sendRequest } = useHttp();

	useEffect(() => {
		sendRequest(
			useHttp.GET("categories/products/?is_deliverable=1"),
			(response: Category[]) => {
				setData(response);
			},
		);
	}, []);

	if (isLoading) {
		return <Loader className="h-screen" />;
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-4">
			{data.map(
				(category) =>
					category.products.length > 0 && (
						<div key={category.id} className="mb-16">
							<h2 className="text-2xl font-semibold ">{category.name}</h2>
							<h5 className="text-muted-foreground">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam,
								officia itaque voluptatem facilis eaque temporibus! Officiis
								perspiciatis quae facere distinctio eveniet facilis nobis ratione
								recusandae placeat consequuntur earum, doloribus necessitatibus.
							</h5>
							<Separator className="my-4 w-full" />
							<div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]">
								{category.products.map((item) => (
									<ProductCard
										key={item.id}
										id={item.id}
										title={item.name}
										description={item.description}
										image={`${BACKEND_URL}${item.image}`}
										price={item.base_price}
									/>
								))}
							</div>
						</div>
					),
			)}
		</div>
	);
}
