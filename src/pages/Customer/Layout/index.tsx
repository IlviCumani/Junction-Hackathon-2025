import { Outlet } from "react-router-dom";
import Navbar from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { CustomerRoot } from "../index.routes";

const navLinks = CustomerRoot.getSubRoutes().map((subRoute) => {
	return {
		label: subRoute.getRouteName() || "Home",
		href: subRoute.getExactPath() || "/", //? For routes that have "" as exact path i add '/'
	};
});

export default function Layout() {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar navLinks={navLinks} />
			<div className="flex-1">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
