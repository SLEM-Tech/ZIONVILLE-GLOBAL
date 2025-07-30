import React from "react";

const HomePageInfoTextSection = () => {
	return (
		<section className='flex w-full bg-white mt-6 py-4 px-5 sm:px-8 pb-12 slg:pb-0 slg:mb-20'>
			<div className='flex flex-col w-full py-3'>
				{/* <h3 className='text-lg sm:text-xl slg:text-2xl font-[500] leading-[1.4] text-center slg:text-start'>
					An online store that offers ...Buy and pay in installments
				</h3> */}
				<div className='text-base md:text-lg leading-relaxed text-gray-700 max-w-4xl space-y-4'>
					<p>
						Zionville Global Store Limited is a premier global logistics &amp;
						supply chain solutions provider,&nbsp; specializing in seamless
						cross&#8209;border transportation &amp; customized procurement
						services. With our extensive network &amp; industry expertise, we
						deliver:
					</p>

					<ul className='space-y-3 pl-5 list-disc'>
						<li>
							<span className='font-semibold'>Freight Forwarding</span> &mdash;
							Comprehensive air, sea, &amp; land transportation solutions
							worldwide
						</li>
						<li>
							<span className='font-semibold'>Customs Clearance</span> &mdash;
							Efficient regulatory compliance &amp; documentation handling
						</li>
						<li>
							<span className='font-semibold'>Supply Chain Management</span>{" "}
							&mdash; End&#8209;to&#8209;end visibility &amp; optimization of
							your logistics operations
						</li>
						<li>
							<span className='font-semibold'>Procurement Services</span>{" "}
							&mdash; Sourcing of industrial equipment &amp; materials with
							quality assurance
						</li>
						<li>
							<span className='font-semibold'>Warehousing Solutions</span>{" "}
							&mdash; Secure storage with advanced inventory management systems
						</li>
						<li>
							<span className='font-semibold'>Project Cargo Handling</span>{" "}
							&mdash; Specialized transport for oversized &amp; heavy&#8209;lift
							shipments
						</li>
					</ul>

					<p className='pt-2'>
						Our commitment to reliability, transparency, &amp;
						cost&#8209;efficiency makes us the preferred partner for businesses
						expanding their global footprint.
					</p>
				</div>
			</div>
		</section>
	);
};

export default HomePageInfoTextSection;
