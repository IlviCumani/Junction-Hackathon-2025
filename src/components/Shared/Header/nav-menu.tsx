import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

type NavMenuProps = NavigationMenuProps & {
	navLinks: { label: string; href: string }[];
	hideUnderline?: boolean;
};

export const NavMenu = ({
	navLinks = [],
	hideUnderline = false,
	className,
	...props
}: NavMenuProps) => {
	const { pathname } = useLocation();

	return (
		<NavigationMenu {...props} className={className}>
			<NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
				{navLinks.map((link) => {
					const isActive = pathname === link.href;
					return (
						<NavigationMenuItem key={link.href}>
							<Link
								to={`${link.href}`}
								className={
									isActive
										? `text-primary ${
												hideUnderline ? "underline underline-offset-2" : ""
										  }`
										: "hover:text-primary "
								}
							>
								{link.label}
							</Link>
							{isActive && !hideUnderline ? (
								<motion.div
									className="bg-primary h-0.5"
									layoutId="underline"
									id="underline"
								/>
							) : null}
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
