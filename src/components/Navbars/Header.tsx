"use client";
import React, { useEffect, useRef, useState } from "react";
import { CartIconSvg, UserIconSvg } from "../SvgIcons";
import { usePathname, useRouter } from "next/navigation";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Tooltip,
} from "@nextui-org/react";
import { useMutation } from "react-query";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNav from "./MobileNav";
import useToken from "../hooks/useToken";
import * as bi from "react-icons/bi";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getFirstCharacter, signOut } from "@utils/lib";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { SlArrowDown } from "react-icons/sl";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Picture from "../picture/Picture";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useCustomer } from "../lib/woocommerce";
import {
	currencyOptions,
	filterCustomersByEmail,
	headerNavLinks,
} from "@constants";
import { ImSpinner2 } from "react-icons/im";
import { LogoImage } from "@utils/function";
import BaseCurrency from "../Reusables/BaseCurrency";
import { useDisclosure } from "@node_modules/@nextui-org/use-disclosure/dist";
import { Modal, ModalContent } from "@node_modules/@nextui-org/modal/dist";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import { fetchExchangeRate } from "@utils/endpoints";
import { APICall } from "@utils";
import FormToast from "../Reusables/Toast/SigninToast";
import { HiShoppingBag } from "@node_modules/react-icons/hi";
import { IoChevronDownCircleOutline } from "@node_modules/react-icons/io5";
import { AiFillCloseCircle } from "@node_modules/react-icons/ai";

const Header = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { totalItems, items } = useCart();
	const isUserPathname = pathname.includes("user");
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [isMobileNav, setIsMobileNav] = useState(false);
	const [isUserClick, setIsUserClick] = useState(false);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const { token, email } = useToken();
	const [searchValue, setSearchValue] = useState("");
	const { baseCurrency } = useAppSelector((state) => state.currency);
	const dispatch = useAppDispatch();
	const [selectedCurrency, setSelectedCurrency] = useState(baseCurrency.code);
	const [isExpanded, setIsExpanded] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { data: customer, isLoading, isError } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer;
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);

	const calculateSubtotal = () => {
		return items.reduce(
			(total, item: any) => total + item?.price * item.quantity,
			0,
		);
	};

	const mobileDropDownLinks = [
		{
			id: 1,
			href: "/user/dashboard",
			icon: <bi.BiUser className='text-base' />,
			label: "My Account",
		},
		{
			id: 2,
			href: "/user/my-orders",
			icon: <FaCartArrowDown className='text-base' />,
			label: "Orders",
		},

		{
			id: 3,
			href: "/cart",
			icon: <FiShoppingCart className='text-base' />,
			label: "Cart",
		},
	];

	// / Close when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsExpanded(false);
			}
		};

		if (isExpanded) {
			document.addEventListener("mousedown", handleClickOutside);
			// Focus input when expanded
			inputRef.current?.focus();
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isExpanded]);

	const handleSearchClick = () => {
		if (isExpanded && searchValue.trim()) {
			setIsSearchLoading(true);
			router.push(`/search?query=${encodeURIComponent(searchValue.trim())}`);
			setTimeout(() => setIsSearchLoading(false), 1000);
		} else {
			setIsExpanded(!isExpanded);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && searchValue.trim()) {
			handleSearchClick();
		} else if (e.key === "Escape") {
			setIsExpanded(false);
		}
	};

	const handleisMobileNavClick = () => {
		setIsUserClick(!isUserClick);
	};

	const handleSearch = () => {
		setIsSearchLoading(true);
		if (pathname === "/search") {
			setIsSearchLoading(false);
			router.push(`/search?${searchValue}`);
		} else {
			router.push(`/search?${searchValue}`);
		}
	};

	// useEffect(() => {
	// 	dispatch(setUserDetails({ data: userAccount }));
	// }, [userAccount]);

	const firstName = wc_customer_info?.first_name;
	const lastName = wc_customer_info?.last_name;
	const openDrawer = () => {
		setDrawerVisible(true);
	};

	const closeDrawer = () => {
		setDrawerVisible(false);
	};

	const handleNavMenuClick = () => {
		setIsMobileNav(!isMobileNav);
		openDrawer();
	};

	const [navbar, setNavbar] = useState(false);

	const setFixedHandler = () => {
		if (typeof window !== "undefined") {
			window.scrollY >= 200 ? setNavbar(true) : setNavbar(false);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("scroll", setFixedHandler);

			return () => {
				window.removeEventListener("scroll", setFixedHandler);
			};
		}
	}, []);

	const {
		isOpen: isOpenBaseCurrency,
		onOpen: onOpenBaseCurrency,
		onOpenChange: onOpenChangeBaseCurrency,
	} = useDisclosure();

	const exchangeRATEMutation = useMutation(
		async (value: string) => {
			const response = await APICall(
				fetchExchangeRate,
				["NGN", value],
				true,
				true,
			);
			return response;
		},
		{
			onSuccess: async (data) => {
				FormToast({
					message: "Exchange rate retrieved successfully.",
					success: true,
				});
			},
			onError: (error: any) => {
				const errorMessage = "Failed to fetch exchange rate. Please try again.";

				FormToast({
					message: errorMessage,
					success: false,
				});
			},
		},
	);

	// Handle currency change
	const handleCurrencyChange = async (keys: "all" | Set<React.Key>) => {
		const selectedValue = Array.from(keys)[0] as string;

		// Find the selected currency object
		const selectedCurrencyObj = currencyOptions.find(
			(c) => c.code === selectedValue,
		);
		if (!selectedCurrencyObj) return;

		// Fetch exchange rate
		try {
			const data = await exchangeRATEMutation.mutateAsync(
				selectedCurrencyObj.code,
			);

			if (data) {
				dispatch(setExchangeRate(data));
				dispatch(setBaseCurrency(selectedCurrencyObj));
				setSelectedCurrency(selectedValue);
			}
		} catch (error) {
			console.error("Error fetching exchange rate:", error);
		}
	};

	return (
		<>
			<header
				className={`flex slg:flex-col w-full justify-center items-center z-50 transition bg-white/90 drop-shadow-md fixed top-0`}
			>
				{/* Desktop */}
				<div className='hidden slg:grid grid-cols-4 items-center w-full py-2 max-w-[1300px] z-30 px-5 lg:px-2 xl:px-0'>
					<LogoImage className='rounded-md !w-[50px] lg:!w-[60px] col-span-1' />

					<div className='flex justify-center items-center w-fit mx-auto gap-12 overflow-hidden h-10 col-span-2'>
						{headerNavLinks.map((link) => (
							<Link
								key={link.id}
								href={link.href}
								className={`text-base leading-[1.8] transition hover:text-primary font-medium relative group ${
									pathname === link.href ? "text-primary" : "text-black"
								}`}
							>
								{link.text}
								<span
									className={`h-[1px] inline-block bg-primary absolute left-0 -bottom-0 group-hover:w-full transition-width ease duration-300 ${
										pathname === link.href ? "w-full" : "w-0"
									}`}
								>
									&nbsp;
								</span>
							</Link>
						))}
					</div>

					<div className='flex items-center justify-end gap-4 xl:gap-8 col-span-1 w-fit'>
						<div className=''>
							<button
								type='button'
								className={`flex items-center justify-center size-8 text-white bg-primary rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring text-xl ${
									isExpanded ? "fixed right-4 top-4 z-50" : "static"
								}`}
								onClick={handleSearchClick}
								aria-label={isExpanded ? "Close search" : "Open search"}
							>
								{isExpanded ? (
									<AiFillCloseCircle />
								) : (
									<FiSearch className='text-sm' />
								)}
							</button>
						</div>
						<div className='flex gap-2 justify-center items-center whitespace-nowrap'>
							{wc_customer_info?.shipping?.address_2 ? (
								<Picture
									src={wc_customer_info?.shipping?.address_2}
									alt={"user-image"}
									loading='eager'
									className='size-10 rounded-full object-contain'
								/>
							) : firstName ? (
								<div className='flex justify-center items-center w-12 h-12'>
									<span className='flex justify-center items-center w-10 h-10 rounded-full bg-primary text-white text-xl font-semibold'>
										{getFirstCharacter(firstName)}
									</span>
								</div>
							) : (
								<div className=''>
									<FiUser className='text-xl text-primary' />
								</div>
							)}

							<div className='flex flex-col text-primary font-semibold text-sm'>
								{firstName ? (
									<div
										className='flex gap-1.5 items-center cursor-pointer group relative'
										onClick={handleisMobileNavClick}
									>
										<span
											title={firstName}
											className='line-clamp-1 overflow-y-hidden w-12'
										>
											{firstName}
										</span>
										<SlArrowDown className='text-primary group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out' />
										<AnimatePresence>
											{isUserClick && (
												<motion.nav
													initial={{ y: -100, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													exit={{ y: -100, opacity: 0 }}
													className='flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute left-0 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light'
												>
													{mobileDropDownLinks.map((item, i) => (
														<Link
															key={i}
															href={item.href}
															className={`${
																pathname === item.href
																	? "text-primary"
																	: "text-black"
															} flex gap-1.5 px-4 items-center hover:text-primary`}
														>
															{item.icon}
															{item.label}
														</Link>
													))}
													<span
														onClick={() => signOut()}
														className='text-center pt-1 pb-2 text-gray-500 hover:text-primary border-t'
													>
														Log Out
													</span>
												</motion.nav>
											)}
										</AnimatePresence>
									</div>
								) : (
									<div className='flex flex-col'>
										<span
											className='cursor-pointer hover:text-primaryColor-200 transition'
											onClick={() => router.push("/user/login")}
										>
											Log In
										</span>
									</div>
								)}
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<Dropdown placement='bottom-end'>
								<DropdownTrigger>
									<button
										type='button'
										className='flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primaryColor-400'
										aria-label='Currency selector'
									>
										<span className='font-medium text-gray-800'>
											{baseCurrency?.symbol}
										</span>
										<IoChevronDownCircleOutline className='w-4 h-4 text-gray-500 transition-transform duration-200 group-data-[open=true]:rotate-180' />
									</button>
								</DropdownTrigger>

								<DropdownMenu
									aria-label='Currency selection'
									className='min-w-[200px] p-2 shadow-lg rounded-xl border border-gray-100 bg-white'
									selectionMode='single'
									selectedKeys={new Set([selectedCurrency])}
									onSelectionChange={handleCurrencyChange}
									disallowEmptySelection
								>
									{currencyOptions.map((currency) => (
										<DropdownItem
											key={currency?.code}
											textValue={currency?.code}
											className='px-3 py-1 rounded-lg hover:bg-gray-50 data-[selected=true]:bg-primaryColor-50 transition-colors'
										>
											<div className='flex items-center gap-3'>
												<span
													className={`fi fi-${currency?.countryCode.toLowerCase()} w-6 h-6`}
												></span>
												<div className='flex-1'>
													<p className='text-sm font-medium text-gray-900'>
														{currency?.code}
													</p>
													<p className='text-xs text-gray-500'>
														{currency?.country}
													</p>
												</div>
												<span className='text-sm font-medium text-gray-700'>
													{currency?.symbol}
												</span>
											</div>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
							<div
								className='flex gap-2 justify-center items-center cursor-pointer'
								onClick={() => router.push("/cart")}
							>
								{typeof window !== "undefined" && (
									<div className='flex relative justify-center items-center rounded-full w-12 h-12 p-2 text-sm'>
										<span className='absolute top-2 right-2 w-4 h-4 bg-primary text-xs text-white shadow-lg flex justify-center items-center rounded-full'>
											{totalItems}
										</span>
										<PiShoppingCartSimpleThin className='text-3xl text-black' />
									</div>
								)}
								<span className='truncate text-sm font-semibold w-16 text-black overflow-hidden'>
									<FormatMoney2 value={calculateSubtotal()} />
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile */}
				<div className='flex flex-col items-center w-full slg:hidden py-2 px-2 xs:px-4'>
					<div className='grid grid-cols-2'>
						<div className='flex items-center gap-1'>
							<div className=''>
								<GiHamburgerMenu
									onClick={handleNavMenuClick}
									className='text-2xl text-primary hover:scale-105 transition-[.5]'
								/>
							</div>
							<LogoImage className='rounded-md !w-[40px] lg:!w-[60px]' />
						</div>

						<div className='flex gap-2 justify-end items-center cursor-pointer'>
							<div className=''>
								<button
									type='button'
									className={`flex items-center justify-center size-8 text-white bg-primary rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring text-xl ${
										isExpanded ? "fixed right-4 top-4 z-50" : "static"
									}`}
									onClick={handleSearchClick}
									aria-label={isExpanded ? "Close search" : "Open search"}
								>
									{isExpanded ? (
										<AiFillCloseCircle />
									) : (
										<FiSearch className='text-sm' />
									)}
								</button>
							</div>
							<div className='flex items-center gap-2'>
								<Dropdown placement='bottom-end'>
									<DropdownTrigger>
										<button
											type='button'
											className='flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primaryColor-400'
											aria-label='Currency selector'
										>
											<span className='font-medium text-gray-800'>
												{baseCurrency?.symbol}
											</span>
											<IoChevronDownCircleOutline className='w-4 h-4 text-gray-500 transition-transform duration-200 group-data-[open=true]:rotate-180' />
										</button>
									</DropdownTrigger>

									<DropdownMenu
										aria-label='Currency selection'
										className='min-w-[200px] p-2 shadow-lg rounded-xl border border-gray-100 bg-white'
										selectionMode='single'
										selectedKeys={new Set([selectedCurrency])}
										onSelectionChange={handleCurrencyChange}
										disallowEmptySelection
									>
										{currencyOptions.map((currency) => (
											<DropdownItem
												key={currency?.code}
												textValue={currency?.code}
												className='px-3 py-1 rounded-lg hover:bg-gray-50 data-[selected=true]:bg-primaryColor-50 transition-colors'
											>
												<div className='flex items-center gap-3'>
													<span
														className={`fi fi-${currency?.countryCode.toLowerCase()} w-6 h-6`}
													></span>
													<div className='flex-1'>
														<p className='text-sm font-medium text-gray-900'>
															{currency?.code}
														</p>
														<p className='text-xs text-gray-500'>
															{currency?.country}
														</p>
													</div>
													<span className='text-sm font-medium text-gray-700'>
														{currency?.symbol}
													</span>
												</div>
											</DropdownItem>
										))}
									</DropdownMenu>
								</Dropdown>
								{firstName ? (
									<div
										className='flex gap-1.5 items-center h-full cursor-pointer group relative'
										onClick={handleisMobileNavClick}
									>
										{wc_customer_info?.shipping?.address_2 ? (
											<Picture
												src={wc_customer_info?.shipping?.address_2}
												alt={"user-image"}
												loading='eager'
												className='w-8 h-8 rounded-full object-contain'
											/>
										) : (
											<span className='flex justify-center items-center w-8 h-8 p-4 rounded-full bg-primary text-white text-xl font-semibold'>
												{getFirstCharacter(firstName)}
											</span>
										)}

										<SlArrowDown className='text-primary text-sm group-hover:text-primary group-hover:translate-y-[2px] transition duration-400 ease-out' />
										<AnimatePresence>
											{isUserClick && (
												<motion.nav
													initial={{ y: -100, opacity: 0 }}
													animate={{ y: 0, opacity: 1 }}
													exit={{ y: -100, opacity: 0 }}
													className='flex flex-col text-black gap-3 pt-4 w-[9rem] bg-white absolute -left-12 top-[1.5rem] rounded-2xl overflow-hidden cursor-pointer duration-500 ease-out drop-shadow-xl z-50 transition font-light'
												>
													{mobileDropDownLinks.map((item, i) => (
														<div
															key={i}
															className='flex gap-2 px-4 items-center text-xs'
														>
															{item.icon}
															<Link
																href={item.href}
																className={`${
																	pathname === item.href
																		? "text-primary"
																		: "text-black"
																} hover:text-primary`}
															>
																{item.label}
															</Link>
														</div>
													))}
													<span
														onClick={() => signOut()}
														className='text-center text-xs pt-1 pb-2 text-gray-500 hover:text-primary border-t'
													>
														Log Out
													</span>
												</motion.nav>
											)}
										</AnimatePresence>
									</div>
								) : (
									<div className=''>
										<FiUser
											onClick={() => router.push("/user/login")}
											className='text-xl text-primary'
										/>
									</div>
								)}
							</div>
							{typeof window !== "undefined" && (
								<div
									onClick={() => router.push("/cart")}
									className='flex relative justify-center items-center p-2 text-xs'
								>
									<div className='absolute top-2 right-2 w-4 h-4 bg-black text-xs text-white shadow-lg flex justify-center items-center rounded-full'>
										{totalItems}
									</div>
									<HiShoppingBag className='text-3xl text-primary' />
								</div>
							)}
						</div>
					</div>

					{drawerVisible && (
						<MobileNav
							closeDrawer={closeDrawer}
							drawerVisible={drawerVisible}
						/>
					)}
				</div>
				{/* Expanded Search Field */}
				{isExpanded && (
					<div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex justify-center items-start pt-20'>
						<div
							ref={searchRef}
							className='relative flex justify-center items-centerl w-[95%] lg:w-[60%] max-w-2xl lg:h-fit bg-white rounded-full border-2 border-primary shadow-lg'
						>
							<input
								ref={inputRef}
								type='text'
								placeholder='Search Spare Parts...'
								className='text-base text-gray-800 placeholder-black/40 px-6 py-2 bg-transparent outline-none flex-grow rounded-l-full'
								value={searchValue}
								onChange={handleInputChange}
								onKeyDown={handleKeyDown}
							/>

							{isSearchLoading ? (
								<button
									type='button'
									className='flex items-center justify-center size-12 text-white bg-primary rounded-r-full'
									disabled
								>
									<ImSpinner2 className='animate-spin' />
								</button>
							) : (
								<button
									type='button'
									className='flex items-center justify-center size-12 text-white bg-primary rounded-r-full hover:bg-primary/90 transition-colors'
									onClick={handleSearchClick}
								>
									<FiSearch />
								</button>
							)}
						</div>
					</div>
				)}
			</header>

			<Modal
				backdrop='opaque'
				isOpen={isOpenBaseCurrency}
				onOpenChange={onOpenChangeBaseCurrency}
				isDismissable={false}
				size='sm'
			>
				<ModalContent>
					{(onClose) => <BaseCurrency onClose={onClose} />}
				</ModalContent>
			</Modal>
		</>
	);
};

export default Header;
