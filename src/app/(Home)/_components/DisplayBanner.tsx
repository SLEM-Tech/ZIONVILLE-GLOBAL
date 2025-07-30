import { displayImg, heroImage } from "@public/images";
import Picture from "@src/components/picture/Picture";
import React from "react";

const DisplayBanner = () => {
	return (
		<section className='flex flex-col-reverse md:flex-row items-center justify-center min-h-[80vh] md:min-h-screen bg-white px-4 sm:px-6 py-0 sm:py-12 md:py-24 gap-8 md:gap-12 relative'>
			{/* Text Section - Classic Elegance */}
			<div className='bg-black text-white p-6 sm:p-8 md:p-12 w-full max-w-lg shadow-xl relative md:-ml-24 z-10 md:mt-0 -mt-8 border-l-4 border-primary'>
				{/* Decorative Corners */}
				<div className='absolute top-0 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-primary'></div>
				<div className='absolute bottom-0 right-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border-b-2 border-r-2 border-primary'></div>

				<div className='space-y-4 sm:space-y-6'>
					<h2 className='text-2xl sm:text-3xl font-serif font-light tracking-wider leading-tight'>
						New Cloth <br />
						<span className='text-3xl sm:text-4xl font-medium'>
							Technologies
						</span>
					</h2>

					<div className='border-t border-gray-700 w-12 sm:w-16 my-3 sm:my-4'></div>

					<p className='text-gray-300 leading-relaxed font-serif text-sm sm:text-base'>
						Mauris vitae ultricies leo integer malesuada. Odio tempor orci
						dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum
						purus viverra accumsan in nisl. Tempor id eu.
					</p>

					<div className='pt-3 sm:pt-4 border-t border-gray-700'>
						<p className='text-white font-serif italic text-base sm:text-lg'>
							Alice W
						</p>
						<p className='text-gray-400 text-xs sm:text-sm mt-1 tracking-wider'>
							Alice Autumn, CEO
						</p>
					</div>
				</div>
			</div>

			{/* Image Section - Timeless Presentation */}
			<div className='w-full max-w-md sm:max-w-xl relative z-0 md:mt-0 mt-8'>
				<div className='hidden sm:block absolute inset-0 border-2 border-white shadow-lg transform translate-x-4 sm:translate-x-6 translate-y-4 sm:translate-y-6 -z-10'></div>
				<Picture
					src={displayImg}
					alt='Premium Textile Innovation'
					className='w-full h-auto object-cover relative z-10'
				/>
				<div className='absolute inset-0 border border-white/20 pointer-events-none'></div>
			</div>
		</section>
	);
};

export default DisplayBanner;
