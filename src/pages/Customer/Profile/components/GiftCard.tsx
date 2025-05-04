type Props = {
	giftCard: {
		id: number;
		from_first_name: string;
		from_last_name: string;
		total_ammount: number;
		current_ammount: number;
		message: string;
		creation_date: string;
	};
};

export default function GiftCard({ giftCard }: Props) {
	return (
		<div className="border rounded-xl p-4 shadow-sm space-y-1"> {/* Removed the background color */}
			<h3 className="text-md font-semibold">
				Gift from {giftCard.from_first_name} {giftCard.from_last_name}
			</h3>
			<p className="text-sm text-muted-foreground">
				Created on: {new Date(giftCard.creation_date).toLocaleDateString()}
			</p>
			<p className="text-sm">Total Amount: €{giftCard.total_ammount.toFixed(2)}</p>
			<p className="text-sm">Remaining Balance: €{giftCard.current_ammount.toFixed(2)}</p>
			{giftCard.message && (
				<p className="text-sm italic text-muted-foreground">“{giftCard.message}”</p>
			)}
		</div>
	);
}
