import { useAuthContext } from "@/context/AuthContext";
import LoyaltyCard from "./components/LoyaltyCard";
import RecentActivity from "./components/RecientActivity";
import RewardPrograms from "./components/RewardPrograms";
const Loyalty = () => {
	const { isAuthenticated } = useAuthContext();

	if (!isAuthenticated) {
		return (
			<div className="flex items-center justify-center my-auto h-screen">
				<p className="text-2xl">Please login to view your loyalty card.</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen space-y-8 mt-4">
			<LoyaltyCard />
			<div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
				<div className="">
					<RewardPrograms />
				</div>
				<div className="col-span-2 max-sm:col-span-1">
					<RecentActivity />
				</div>
			</div>
		</div>
	);
};

export default Loyalty;
