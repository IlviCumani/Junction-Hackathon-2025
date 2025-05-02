import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

import { SiMeta, SiTiktok, SiX, SiInstagram } from "@icons-pack/react-simple-icons";
import { CustomerRoot } from "@/pages/Customer/index.routes";

const navLinks = CustomerRoot.getSubRoutes().map((subRoute) => {
	return {
		title: subRoute.getRouteName() || "Home",
		href: subRoute.getExactPath(),
	};
});

export default function Footer() {
	return (
		<div className="flex flex-col border-t bg-secondary">
			<div className="grow" />
			<footer>
				<div className="max-w-(--breakpoint-xl) mx-auto">
					<div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
						<div>
							<ul className="mt-6 flex items-center gap-4 flex-wrap">
								{navLinks.map(({ title, href }) => (
									<li key={title}>
										<Link
											to={href}
											className="text-muted-foreground hover:text-foreground"
										>
											{title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
					<Separator className="bg-muted-foreground" />
					<div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
						<span className="text-muted-foreground">
							&copy; {new Date().getFullYear()}{" "}
							<Link to="/" target="_blank">
								Tost Man LLC
							</Link>
							. All rights reserved.
						</span>

						<div className="flex items-center gap-5 text-muted-foreground">
							<Link to="#" target="_blank">
								<SiMeta className="h-5 w-5 " />
							</Link>
							<Link to="#" target="_blank">
								<SiX className="h-5 w-5 " />
							</Link>
							<Link to="#" target="_blank">
								<SiInstagram className="h-5 w-5" />
							</Link>
							<Link to="#" target="_blank">
								<SiTiktok className="h-5 w-5" />
							</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
