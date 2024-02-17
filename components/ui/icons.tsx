import {
	Bars3Icon,
	CheckIcon,
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
	XMarkIcon,
} from "@heroicons/react/20/solid";
import { CaretSortIcon, ChevronDownIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { BsCpu, BsRocket } from "react-icons/bs";
import { CgDisplayFlex } from "react-icons/cg";
import { FaRegFilePdf } from "react-icons/fa6";
import { GiFlexibleLamp, GiHelp } from "react-icons/gi";
import { ImWarning } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { MdInventory, MdDownload, MdDelete } from "react-icons/md";
import { RiRoadMapLine } from "react-icons/ri";
import { TfiLayers } from "react-icons/tfi";

type IconPropsType = React.HTMLAttributes<SVGElement>;

export const Icons = {
	search: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
			{...props}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
			/>
		</svg>
	),
	gitHub: (props: IconPropsType) => (
		<svg
			viewBox="0 0 438.549 438.549"
			{...props}>
			<path
				fill="currentColor"
				d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"></path>
		</svg>
	),
	microsoft: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="21"
			height="21"
			viewBox="0 0 21 21"
			{...props}>
			<title>MS-SymbolLockup</title>
			<rect
				x="1"
				y="1"
				width="9"
				height="9"
				fill="currentColor"
			/>
			<rect
				x="1"
				y="11"
				width="9"
				height="9"
				fill="currentColor"
			/>
			<rect
				x="11"
				y="1"
				width="9"
				height="9"
				fill="currentColor"
			/>
			<rect
				x="11"
				y="11"
				width="9"
				height="9"
				fill="currentColor"
			/>
		</svg>
	),
	google: (props: IconPropsType) => (
		<svg
			role="img"
			viewBox="0 0 24 24"
			{...props}>
			<path
				fill="currentColor"
				d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
			/>
		</svg>
	),
	apple: (props: IconPropsType) => (
		<svg
			role="img"
			viewBox="0 0 24 24"
			{...props}>
			<path
				d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
				fill="currentColor"
			/>
		</svg>
	),
	calculator: (props: IconPropsType) => (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<rect
				width="16"
				height="20"
				x="4"
				y="2"
				rx="2"
			/>
			<line
				x1="8"
				x2="16"
				y1="6"
				y2="6"
			/>
			<line
				x1="16"
				x2="16"
				y1="14"
				y2="18"
			/>
			<path d="M16 10h.01" />
			<path d="M12 10h.01" />
			<path d="M8 10h.01" />
			<path d="M12 14h.01" />
			<path d="M8 14h.01" />
			<path d="M12 18h.01" />
			<path d="M8 18h.01" />
		</svg>
	),
	spinner: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),
	eye: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
			{...props}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
			/>
		</svg>
	),
	eyeSlash: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className="w-6 h-6"
			{...props}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
			/>
		</svg>
	),
	cart: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="w-6 h-6"
			{...props}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
			/>
		</svg>
	),
	cart2: (props: IconPropsType) => (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round">
			<circle
				cx="8"
				cy="21"
				r="1"
			/>
			<circle
				cx="19"
				cy="21"
				r="1"
			/>
			<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
		</svg>
	),
	rupee: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			className="w-6 h-6"
			{...props}>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	triangle: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100"
			height="100"
			viewBox="0 0 100 100"
			{...props}>
			<path
				d="M 50 10 L 90 90 L 10 90 Z"
				fill="black"
			/>
		</svg>
	),
	guest: (props: IconPropsType) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="h-fit w-fit text-gray-300"
			fill="currentColor"
			viewBox="0 0 24 24"
			{...props}>
			<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
		</svg>
	),
	// react-icons
	BsCpu: BsCpu as JSX.ElementType,
	BsRocket: BsRocket as JSX.ElementType,
	CgDisplayFlex: CgDisplayFlex as JSX.ElementType,
	GiFlexibleLamp: GiFlexibleLamp as JSX.ElementType,
	GiHelp: GiHelp as JSX.ElementType,
	MdInventory: MdInventory as JSX.ElementType,
	Download: MdDownload as JSX.ElementType,
	Delete: MdDelete as JSX.ElementType,
	RiRoadMapLine: RiRoadMapLine as JSX.ElementType,
	TfiLayers: TfiLayers as JSX.ElementType,
	Pdf: FaRegFilePdf as JSX.ElementType,
	ImWarning: ImWarning as JSX.ElementType,
	IoIosArrowDown: IoIosArrowDown as JSX.ElementType,

	// radix-ui/react-icons | hero icons
	HeartFilledIcon,
	Bars3Icon,
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
	CaretSortIcon,
	CheckIcon,
	XMarkIcon,
	ChevronDownIcon,
};
