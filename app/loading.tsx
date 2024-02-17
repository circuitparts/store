import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex justify-center items-center h-screen">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
}
