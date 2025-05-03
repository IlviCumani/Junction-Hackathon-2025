import { Button } from "@/components/ui/button";

const LoyaltyBanner = () => {
	// Static placeholder (no user logic)
	const isLoggedIn = false; // set to true if you want to preview the logged-in version
	const loyaltyPoints = 120; // example static number for testing

	return (
		<section className="bg-primary/30 text-white py-16 relative rounded-md">
			<div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent"></div>
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-2xl md:text-3xl font-bold mb-2">
					{isLoggedIn ? "You're earning points!" : "Join Our Loyalty Program"}
				</h2>

				<p className="text-cafe-cream mb-6 max-w-2xl mx-auto">
					{isLoggedIn
						? `You have ${loyaltyPoints} points. Keep collecting and redeem for free items!`
						: "Earn 10 points for every dollar spent. Redeem points for free coffee, pastries, and exclusive perks."}
				</p>

				<Button
					variant={"outline"}
					onClick={() => {
						window.location.href = "/loyalty";
					}}
				>
					{isLoggedIn ? "View Your Rewards" : "Sign Up Now"}
				</Button>
			</div>
		</section>
	);
};

export default LoyaltyBanner;
