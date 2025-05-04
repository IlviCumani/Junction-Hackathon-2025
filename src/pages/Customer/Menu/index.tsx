// index.tsx

import Form from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useHttp } from "@/hooks/use-http";

import { Coffee, Cookie, CupSoda, Nut, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ProductCard from "@/pages/Customer/Delivery/components/ProductCard";
const BACKEND_URL = import.meta.env.REACT_APP_IMAGE;

const Menu = () => {
	const form = useForm();
	const [order, setOrder] = useState<any>({
		custom_orders: [],
		normal_orders: [],
	});
	const [normalItems, setNormalItems] = useState<any>([]);
	const { watch } = form;
	const { sendRequest } = useHttp();
	const [options, setOptions] = useState<any>({
		milkOptions: [],
		coffeeOptions: [],
	});

	useEffect(() => {
		sendRequest(useHttp.GET("options/"), (response: any) => {
			const milkTypes = response.filter((item: any) => {
				return item.type === "milk";
			});
			const coffeeTypes = response.filter((item: any) => {
				return item.type === "coffee";
			});

			setOptions({
				milkOptions: milkTypes,
				coffeeOptions: coffeeTypes,
			});
		});

		sendRequest(useHttp.GET("categories/products/?is_deliverable=0"), (response: any) => {
			setNormalItems(response);
		});
	}, []);

	console.log(order);

	const coffeeDose = watch("coffee_dose");
	const milkDose = watch("milk_dose");

	const maxCoffeeDosePercentage = useMemo(() => {
		return 100 - (milkDose || 0);
	}, [coffeeDose, milkDose]);

	const maxMilkDosePercentage = useMemo(() => {
		return 100 - (coffeeDose || 0);
	}, [coffeeDose, milkDose]);

	function handleSubmit(data: any) {
		const orderData = {
			order_options: [
				{
					option: data.milk_options,
					ammount: data.milk_dose,
				},
				{
					option: data.coffee_type,
					ammount: data.coffee_dose,
				},
			],
			ammount: data.amount,
		};

		setOrder((prev: any) => {
			return {
				...prev,
				custom_orders: [...prev.custom_orders, orderData],
			};
		});

		// sendRequest(
		// 	useHttp.POST("create/order/", {
		// 		custom_orders: [orderData],
		// 		normal_orders: [],
		// 	}),
		// );
	}

	function submitOrder() {
		const mappedNormalOrder = order.normal_orders.map((o: any) => {
			return {
				product: o.id,
				ammount: o.quantity,
			};
		});

		sendRequest(
			useHttp.POST("create/order/", {
				custom_orders: order.custom_orders,
				normal_orders: mappedNormalOrder,
			}),
		);
	}

	return (
		<div className="space-y-4">
			{(order.custom_orders.length > 0 || order.normal_orders.length > 0) && (
				<Card>
					<CardHeader>
						<CardTitle>Your Order</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-2">
						{order.custom_orders.map((order: any, index: number) => {
							const coffeeOption = options.coffeeOptions.find(
								(o: any) =>
									o.id ==
									order.order_options.find((opt: any) => o.id == opt.option)
										?.option,
							);
							const coffeeDose = order.order_options.find((opt: any) =>
								options.coffeeOptions.some((co: any) => co.id == opt.option),
							)?.ammount;

							const milkOption = options.milkOptions.find(
								(o: any) =>
									o.id ==
									order.order_options.find((opt: any) => o.id == opt.option)
										?.option,
							);
							const milkDose = order.order_options.find((opt: any) =>
								options.milkOptions.some((mo: any) => mo.id == opt.option),
							)?.ammount;

							return (
								<Card key={index} className="flex items-center gap-2">
									<CardContent className="flex gap-2 pt-5">
										{`${order.ammount} ${
											coffeeOption?.name ?? "Unknown Coffee"
										} filled up to ${coffeeDose}% and ${
											milkOption?.name ?? "Unknown Milk"
										} filled up to ${milkDose}%`}
									</CardContent>
								</Card>
							);
						})}
						{order.normal_orders.map((item: any, index: number) => (
							<Card key={index} className="flex items-center gap-2">
								<CardContent className="flex gap-2 pt-5">
									{`${item.name} - Qty: ${item.quantity}`}
								</CardContent>
							</Card>
						))}
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button onClick={submitOrder}>Order</Button>
					</CardFooter>
				</Card>
			)}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						Create Your Coffee
						<Coffee />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form form={form} onSubmit={handleSubmit}>
						<div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
							<Form.Select
								name="coffee_type"
								label="Coffee Type"
								options={options.coffeeOptions.map((option: any) => {
									return {
										value: option.id,
										label: option.name,
									};
								})}
							></Form.Select>
							<Form.Select
								name="milk_options"
								label="Milk Options"
								options={options.milkOptions.map((option: any) => {
									return {
										value: option.id,
										label: option.name,
									};
								})}
							></Form.Select>
							<Form.Slider
								name="coffee_dose"
								label="Coffee Dose"
								max={maxCoffeeDosePercentage}
							></Form.Slider>
							<Form.Slider
								name="milk_dose"
								label="Milk Dose"
								max={maxMilkDosePercentage}
							></Form.Slider>
						</div>
						<div className="flex flex-col gap-4 mt-4">
							<span>Toppings</span>
							<div className="flex gap-2 w-full flex-1 flex-wrap">
								<Form.Checkbox
									name="nuts"
									label="Nuts"
									isCard
									description="Add nuts to your coffee"
									icon={<Nut />}
								></Form.Checkbox>
								<Form.Checkbox
									name="walnuts"
									description="Add walnuts to your coffee"
									label="Walnuts"
									isCard
									icon={<Nut />}
								></Form.Checkbox>
								<Form.Checkbox
									name="pistachios"
									label="Pistachios"
									description="Add pistachios to your coffee"
									isCard
									icon={<Nut />}
								></Form.Checkbox>
								<Form.Checkbox
									name="cookies"
									label="Crumbled Cookies"
									description="Add Crumbled Cookies to your coffee"
									isCard
									icon={<Cookie />}
								></Form.Checkbox>
							</div>
						</div>
						<div className="flex items-start my-4">
							<ToggleGroup type="single" defaultValue="md">
								<ToggleGroupItem value="sm">
									<CupSoda />
									Sn
								</ToggleGroupItem>
								<ToggleGroupItem value="md">
									<CupSoda />
									Md
								</ToggleGroupItem>
								<ToggleGroupItem value="lg">
									<CupSoda />
									Lg
								</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<div>
							<Form.Number
								name="amount"
								label="Quantity"
								type={["positive", "integer"]}
							></Form.Number>
						</div>

						<div className="flex justify-end mt-4">
							<Button>
								<Plus />
								Add Order
							</Button>
						</div>
					</Form>
				</CardContent>
			</Card>
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Order our products</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="w-full max-w-7xl mx-auto px-4">
						{normalItems.map(
							(category: any) =>
								category.products.length > 0 && (
									<div key={category.id} className="mb-16">
										<div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(20rem,1fr))]">
											{category.products.map((item: any, index: number) => (
												<ProductCard
													key={item.id}
													id={item.id}
													title={item.name}
													description={item.description}
													image={`${BACKEND_URL}${item.image}`}
													price={item.base_price}
													isPopular={index % 2 === 1}
													onBtnClick={() => {
														setOrder((prev: any) => {
															const existingIndex =
																prev.normal_orders.findIndex(
																	(o: any) => o.id === item.id,
																);

															let updatedNormalOrders;
															if (existingIndex !== -1) {
																// Update quantity
																updatedNormalOrders = [
																	...prev.normal_orders,
																];
																updatedNormalOrders[existingIndex] =
																	{
																		...updatedNormalOrders[
																			existingIndex
																		],
																		quantity:
																			(updatedNormalOrders[
																				existingIndex
																			].quantity || 1) + 1,
																	};
															} else {
																updatedNormalOrders = [
																	...prev.normal_orders,
																	{ ...item, quantity: 1 },
																];
															}

															return {
																...prev,
																normal_orders: updatedNormalOrders,
															};
														});
													}}
												/>
											))}
										</div>
									</div>
								),
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default Menu;
