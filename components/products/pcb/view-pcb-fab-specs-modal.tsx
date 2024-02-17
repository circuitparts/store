"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transformStringToTitleCase } from "@/lib/utils";
import type { PcbFabSpecsModalProps, TableRowProps } from "@/types/modal-props";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function ViewPcbFabSpecsModal(props: PcbFabSpecsModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { fabSpecs } = props;
	const specKeys: string[] = Object.keys(fabSpecs);
	return (
		<>
			<div>
				<Button
					variant={"link"}
					className="-ml-4"
					onClick={() => setIsOpen(true)}>
					View PCB Specifications
				</Button>
			</div>
			<Transition
				appear
				show={isOpen}
				as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsOpen(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full h-96 max-w-lg transform border bg-white overflow-y-auto no-scrollbar p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6">
										Fabrication Specifications
									</Dialog.Title>
									<div className="mt-2">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Specification</TableHead>
													<TableHead>Value</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{specKeys.map((specName, specIdx) => {
													const titleCaseSpecName = transformStringToTitleCase(specName);
													return (
														<TableData
															key={specIdx}
															label={titleCaseSpecName}
															isVisible={
																fabSpecs[specName as keyof typeof fabSpecs] !== null
															}
															value={fabSpecs[specName as keyof typeof fabSpecs]}
														/>
													);
												})}
											</TableBody>
										</Table>
									</div>

									<div className="mt-4">
										<Button
											type="button"
											onClick={() => setIsOpen(false)}>
											Got it, thanks!
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

function TableData(props: TableRowProps) {
	const { isVisible, label, value } = props;
	if (!isVisible) return null;
	let content;
	if (label === "Uploaded File Url") {
		content = (
			<Link
				href={value as string}
				target="_blank">
				Download
			</Link>
		);
	} else {
		content = value;
	}
	return (
		<TableRow>
			<TableCell>{label}</TableCell>
			<TableCell>{content}</TableCell>
		</TableRow>
	);
}
