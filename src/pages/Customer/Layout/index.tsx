import { Outlet } from "react-router-dom";
import Navbar from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import { CustomerRoot, ProfileRoute } from "../index.routes";
import { useAuthContext } from "@/context/AuthContext";
import { useMemo } from "react";

const navLinks = CustomerRoot.getSubRoutes().map((subRoute) => {
	return {
		label: subRoute.getRouteName() || "Home",
		needsAuth: subRoute.getNeedsAuthentication(),
		href: subRoute.getExactPath() || "/", //? For routes that have "" as exact path i add '/'
	};
});

export default function Layout() {
	const { isAuthenticated } = useAuthContext();

	const filteredNavLinks = useMemo(() => {
		if (!isAuthenticated) {
			return navLinks.filter((link) => !link.needsAuth);
		} else {
			return navLinks.filter((link) => link.href !== ProfileRoute.getExactPath());
		}
	}, [isAuthenticated]);

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar navLinks={filteredNavLinks} />
			<div className="flex-1 m-4">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
