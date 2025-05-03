import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Shared/Header";
import { CustomerRoot } from "@/pages/Customer/index.routes";
const navLinks = CustomerRoot.getSubRoutes().map((subRoute) => {
	return {
		label: subRoute.getRouteName() || "Home",
		href: subRoute.getExactPath() || "/", //? For routes that have "" as exact path i add '/'
	};
});

export default function Layout() {
	return (
		<div className="flex flex-col w-full  min-h-screen ">
			<div className="flex-1 w-full h-full flex flex-col">
				<Header navLinks={navLinks} />
				<div className="flex justify-center mt-20  items-center">
					<Card className="w-full max-w-md">
						<Outlet />
					</Card>
				</div>
			</div>
		</div>
	);
}
