"use client";
import Link from "next/link";
import { FaShoppingBag } from "@node_modules/react-icons/fa";
import { bedImg } from "@public/images";
import Picture from "@src/components/picture/Picture";
import React from "react";
import { useProduct } from "@src/components/lib/woocommerce";

interface GridConfig {
	gridClass: string;
	items: { colSpan: string }[];
}

const MiddleBanner = () => {
	const {
		data: products,
		isLoading: productsWpIsLoading,
		isError: productsIsError,
	} = useProduct("");

	const Products: ProductType[] = products || []; // Fallback to empty array

	// Safely get featured products with null checks
	const featuredProducts: ProductType[] = (
		Products?.filter((p) => p?.featured) || []
	).slice(0, 5);

	// Safely combine arrays with fallbacks
	const displayProducts: ProductType[] = [
		...(featuredProducts || []),
		...(Products || []),
	].slice(0, 5);

	// Grid layout configurations with proper typing
	const gridConfigs: Record<number, GridConfig> = {
		1: {
			gridClass: "grid-cols-1 grid-rows-1 h-full",
			items: [{ colSpan: "col-span-1 row-span-1" }],
		},
		2: {
			gridClass: "grid-cols-1 md:grid-cols-2 grid-rows-2 h-full",
			items: [
				{ colSpan: "col-span-1 md:col-span-1 row-span-1 md:row-span-2" },
				{ colSpan: "col-span-1 row-span-1" },
			],
		},
		3: {
			gridClass: "grid-cols-1 md:grid-cols-2 grid-rows-3 h-full",
			items: [
				{ colSpan: "col-span-1 md:col-span-1 row-span-1 md:row-span-2" },
				{ colSpan: "col-span-1 row-span-1" },
				{ colSpan: "col-span-1 row-span-1" },
			],
		},
		4: {
			gridClass: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3 h-full",
			items: [
				{ colSpan: "col-span-1 sm:col-span-2 row-span-1 lg:row-span-2" },
				{ colSpan: "col-span-1 row-span-1" },
				{ colSpan: "col-span-1 row-span-1" },
				{ colSpan: "col-span-1 row-span-1" },
			],
		},
		5: {
			gridClass: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-2 h-full",
			items: [
				{
					colSpan:
						"col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 lg:row-span-2",
				},
				{ colSpan: "col-span-1 row-span-1" },
				{ colSpan: "col-span-1 row-span-1" },
				{ colSpan: "col-span-1 row-span-1" },
				{ colSpan: "col-span-1 row-span-1" },
			],
		},
	};

	// Ensure we only use valid keys (1-5)
	const productCount = Math.min(Math.max(1, displayProducts?.length), 5) as
		| 1
		| 2
		| 3
		| 4
		| 5;
	const currentConfig = gridConfigs[productCount];
	return (
		<section className='relative min-h-[100vh] my-10'>
			{/* Grid Container */}
			<div
				className={`grid ${currentConfig.gridClass} h-full w-full absolute inset-0 gap-4 p-4`}
			>
				{displayProducts?.map((product: ProductType, index: number) => {
					const isMain = index === 0 && displayProducts?.length > 1;
					const imageSrc = product?.images[0]?.src || "/default-product.jpg";

					return (
						<div
							key={product.id}
							className={`relative ${
								currentConfig?.items[index]?.colSpan || "col-span-1 row-span-1"
							} group overflow-hidden rounded-xl`}
						>
							<Picture
								src={imageSrc}
								alt={product?.name}
								className='w-full h-full object-fill transition-transform duration-500 group-hover:scale-105'
							/>

							{/* Overlay Content */}
							<div
								className={`absolute inset-0 ${
									isMain
										? "bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-8"
										: "bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								}`}
							>
								{isMain ? (
									<div className='max-w-lg'>
										<h3 className='text-4xl md:text-5xl font-bold tracking-tight text-white mb-3'>
											{product?.name}
										</h3>
										<p className='text-lg text-white/90 mb-6'>
											{product?.short_description || "Premium quality product?"}
										</p>
										<Link
											href={product?.permalink}
											className='bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-3 inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-300'
										>
											<FaShoppingBag />
											Shop Now
										</Link>
									</div>
								) : (
									<div className='text-center p-4'>
										<p className='text-white font-medium text-lg'>
											{product?.name}
										</p>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default MiddleBanner;
