"use client";
import { convertToSlug } from "@constants";
import { BsArrowRight } from "@node_modules/react-icons/bs";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { updateCategorySlugId } from "@src/components/config/features/subCategoryId";
import {
	useCategories,
	useProduct,
	useProductsByCategory,
	WooCommerce,
} from "@src/components/lib/woocommerce";
import Carousel from "@src/components/Reusables/Carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const Loader = () => (
	<div className='flex gap-2 w-full items-center'>
		{/* Add more loader divs if you want more placeholders */}
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
		<div className='min-w-[150px] md:min-w-[180px] h-[180px] sm:h-[230px] bg-gray-200 animate-pulse rounded-md' />
	</div>
);

const SortedProducts = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});

	useEffect(() => {
		// Fetch products for each filtered category
		const fetchCategoryProducts = async () => {
			try {
				// Set loading to true when starting the fetch
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);
							return { [category?.id]: response?.data }; // Return products mapped by category id
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with products mapped by category
					const productsMap = productsResults.reduce(
						(acc, result) => ({ ...acc, ...result }),
						{},
					);
					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				// Set loading to false when fetching is done
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const TotalCategoryProductsMap: any = categoryProductsMap?.length;

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCategoryProductsMap - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			// console.log(scrollLeft);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	const handleCategoryClick = (name: string, id: number) => {
		const categorySlugId = `${convertToSlug(name) + "-" + id}`;
		dispatch(updateCategorySlugId({ categorySlugId }));
		router.push(`/category/${convertToSlug(name) + "-" + id}`);
	};

	const [activeTab, setActiveTab] = useState(0);

	const filteredCategories = categories
		?.filter((category: CategoryType) => category?.count > 0)
		?.slice(0, 5);

	return (
		<div className='mb-8 lg:mb-16 space-y-5 sm:space-y-6 mt-2 lg:mt-4'>
			<h3 className='text-xl sm:text-2xl md:text-3xl text-center font-semibold tracking-tight'>
				View Our Products
			</h3>
			<div className='space-y-8 w-full'>
				{/* Tab Headers */}
				<div className='relative'>
					{/* Scrollable tabs container with gradient indicators */}
					<div className='relative w-full'>
						<div className='flex lg:justify-center overflow-x-auto pb-2 no-scrollbar px-2 w-full'>
							<div className='inline-flex space-x-2 rounded-xl bg-primary p-1.5 min-w-max'>
								{filteredCategories?.map(
									(category: CategoryType, index: number) => (
										<button
											key={category?.id}
											onClick={() => setActiveTab(index)}
											className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg flex items-center whitespace-nowrap ${
												activeTab === index
													? "bg-white shadow-md text-primary"
													: "text-white hover:bg-white/20"
											}`}
											aria-current={activeTab === index ? "page" : undefined}
										>
											<span
												dangerouslySetInnerHTML={{ __html: category?.name }}
												className='truncate max-w-[120px] xs:max-w-[150px] sm:max-w-none'
											/>
											{category?.count > 0 && (
												<span
													className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
														activeTab === index
															? "bg-primary/10 text-primary"
															: "bg-white/20 text-white"
													}`}
												>
													{category?.count}
												</span>
											)}
										</button>
									),
								)}
							</div>
						</div>

						{/* Mobile scroll indicators (only visible when scrollable) */}
						<div className='absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-primary to-transparent pointer-events-none md:hidden' />
						<div className='absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-primary to-transparent pointer-events-none md:hidden' />
					</div>

					{/* Active tab indicator */}
					{filteredCategories?.length > 0 && (
						<div
							className='absolute -bottom-1 left-0 h-0.5 bg-primaryColor-300/10 transition-all duration-300 shadow-sm'
							style={{
								width: `${100 / filteredCategories.length}%`,
								transform: `translateX(${activeTab * 100}%)`,
							}}
						/>
					)}
				</div>

				{/* Tab Content */}
				<div className='px-1'>
					{filteredCategories?.map((category: CategoryType, index: number) => (
						<div
							key={category?.id}
							className={`space-y-6 ${activeTab !== index ? "hidden" : ""}`}
						>
							{/* Category Header */}
							<div className='flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100'>
								<h2 className='text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
									<span dangerouslySetInnerHTML={{ __html: category?.name }} />
								</h2>

								<Link
									href={`/category/${convertToSlug(category?.name)}-${
										category?.id
									}`}
									className='group flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors'
								>
									View all
									<BsArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
								</Link>
							</div>

							{/* Products Grid */}
							{isLoading ? (
								<div className='grid place-items-center h-64'>
									<Loader />
								</div>
							) : (
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6'>
									{categoryProductsMap[category?.id]?.map(
										(product: ProductType) => (
											<ProductCard2
												key={product?.id}
												id={product?.id}
												image={product?.images[0]?.src}
												oldAmount={product?.regular_price}
												newAmount={product?.price}
												description={product?.name}
												category={product?.categories[0]?.name}
												className='hover:scale-[1.02] transition-transform duration-300 hover:shadow-lg'
											/>
										),
									)}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SortedProducts;
