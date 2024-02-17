import { Skeleton } from "@/components/ui/skeleton";

export function PartDetailSkeleton() {
	return (
		<div className="px-4 py-0 space-y-8 lg:space-y-0 sm:px-6 sm:py-10 lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-8">
			<div className="flex flex-col space-y-3">
				<Skeleton className="h-[300px] w-full lg:w-3/4 rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-1/4" />
				</div>
			</div>
			<div className="flex flex-col space-y-3">
				<Skeleton className="h-[300px] w-full lg:w-3/4 rounded-xl" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-2/3" />
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-1/4" />
				</div>
			</div>
		</div>
	);
}
