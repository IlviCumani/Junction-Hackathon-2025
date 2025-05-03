import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useNavigate } from "react-router-dom";
import { LoginRoute } from "@/pages/Auth/index.route";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartContext } from "@/context/CartContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type HeaderProps = {
	navLinks?: { label: string; href: string }[];
};

const Navbar = ({ navLinks = [] }: HeaderProps) => {
	const navigate = useNavigate();
	const { cartItems, updateQuantity } = useCartContext();
	const { isAuthenticated, user } = useAuthContext();
	const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<nav className="h-16 bg-background border-b ">
			<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1>TEMP LOGO</h1>

				<NavMenu className="hidden md:block" navLinks={navLinks} />

				<div className="flex items-center gap-3">
					<Popover>
						<PopoverTrigger asChild>
							<Button size={"icon"} variant="outline" className="relative">
								{cartItems.length > 0 && (
									<span className="absolute top-0 right-0 bg-destructive text-xs  rounded-full px-1">
										{cartItemsCount}
									</span>
								)}
								<ShoppingCart className="h-5 w-5" />
							</Button>
						</PopoverTrigger>
						<PopoverContent align="end">
							<div className="w-full">
								<h2 className="text-lg font-semibold">Your Shopping Cart</h2>
								<div className="flex flex-col gap-4 mt-4">
									{cartItems.map((item) => (
										<div className="flex items-center justify-between">
											<div key={item.id} className="flex items-center gap-4">
												<img
													src={item.image}
													alt={item.name}
													className="w-12 h-12 object-cover rounded "
												/>
												<div>
													<h3>{item.name}</h3>
													<p>${item.price}</p>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<Button
													size={"icon"}
													variant="outline"
													className="size-6"
													onClick={() => {
														updateQuantity(item.id, item.quantity - 1);
													}}
												>
													<Minus />
												</Button>
												<span>{item.quantity}</span>
												<Button
													size={"icon"}
													variant="outline"
													className="size-6"
													onClick={() => {
														updateQuantity(item.id, item.quantity + 1);
													}}
												>
													<Plus />
												</Button>
											</div>
										</div>
									))}
								</div>
								<Separator className="mt-2" />
								{cartItemsCount > 0 && (
									<>
										<div className="flex justify-between mt-2">
											<span className="font-semibold text-sm text-muted-foreground">
												Total:
											</span>
											<span className="font-semibold text-sm text-muted-foreground">
												$
												{cartItems
													.reduce(
														(acc, item) =>
															acc + item.price * item.quantity,
														0,
													)
													.toFixed(2)}
											</span>
										</div>
										<Button className="w-full mt-4" size={"sm"}>
											Checkout
										</Button>
									</>
								)}
							</div>
						</PopoverContent>
					</Popover>

					{!isAuthenticated ? (
						<Button
							variant="outline"
							onClick={() => {
								navigate(LoginRoute.getExactPath());
							}}
						>
							Login
						</Button>
					) : (
						<Avatar className="size-8">
							<AvatarFallback>{`${user?.first_name[0]}${user?.last_email[0]}`}</AvatarFallback>
						</Avatar>
					)}

					<div className="md:hidden">
						<NavigationSheet navLinks={navLinks} />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
