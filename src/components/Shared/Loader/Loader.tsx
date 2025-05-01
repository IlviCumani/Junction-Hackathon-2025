import { LoaderCircle, Loader as L, LoaderPinwheel, RotateCw, RefreshCw } from "lucide-react";
import { useMemo } from "react";
import { LoaderVariant } from "./enums/LoaderVariants";
import { cn } from "@/lib/utils";

type LoaderProps = {
	size?: number;
	variant?: LoaderVariant;
	className?: string;
};

export default function Loader({
	size = 38,
	variant = LoaderVariant.Circle,
	className,
}: LoaderProps) {
	const Wrapper = useMemo(() => {
		switch (variant) {
			case LoaderVariant.Circle:
				return LoaderCircle;
			case LoaderVariant.PinWheel:
				return LoaderPinwheel;
			case LoaderVariant.Arrow:
				return RotateCw;
			case LoaderVariant.DoubleArrow:
				return RefreshCw;
			default:
				return L;
		}
	}, [variant]);

	return (
		<div className="flex items-center justify-center h-full">
			<Wrapper size={size} className={cn("animate-spin text-muted-foreground", className)} />
		</div>
	);
}

Loader.Variants = LoaderVariant;
