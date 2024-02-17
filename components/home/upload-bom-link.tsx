import { UPLOAD_BOM_PAGE } from "@/lib/constants/page-routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function UploadBomLink() {
	return (
		<div className="flex items-center justify-center gap-x-2">
			Too many parts?
			<Button
				asChild
				size={"sm"}
				variant={"outline"}
				className="border-s border-gray-900 text-sm">
				<Link href={UPLOAD_BOM_PAGE}>Upload your BOM</Link>
			</Button>
		</div>
	);
}
