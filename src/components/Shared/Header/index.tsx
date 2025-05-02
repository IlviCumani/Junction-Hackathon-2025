import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useNavigate } from "react-router-dom";
import { LoginRoute } from "@/pages/Auth/index.route";
type HeaderProps = {
	navLinks?: { label: string; href: string }[];
};

const Navbar = ({ navLinks = [] }: HeaderProps) => {
	const navigate = useNavigate();
	return (
		<nav className="h-16 bg-background border-b ">
			<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* <Logo /> */}
				<h1>TEMP LOGO</h1>

				<NavMenu className="hidden md:block" navLinks={navLinks} />

				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						onClick={() => {
							navigate(LoginRoute.getExactPath());
						}}
					>
						Login
					</Button>

					<div className="md:hidden">
						<NavigationSheet navLinks={navLinks} />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
