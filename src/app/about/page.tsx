import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";

const page = () => {
	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-32 md:mt-36 pb-10 slg:pb-32'>
				<section className='flex w-full flex-col items-center pt-7 slg:pt-16 gap-4 px-16 text-center'>
					<h3 className='font-semibold  text-xl md:text-3xl tracking-tighter'>
						About Us
					</h3>
				</section>

				<div className='grid slg:grid-cols-2 mt-2 sm:mt-5 slg:mt-10 px-4 slg:px-16 overflow-hidden'>
					<div className='flex flex-col gap-2'>
						<h3 className='slg:text-2xl text-lg font-semibold text-center slg:text-start'>
							Welcome to our Zionville Global Store Limited
						</h3>

						<div className='flex flex-col gap-4'>
							<h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-center md:text-left text-primary'>
								Welcome to Zionville Global Store Limited
							</h3>

							<div className='text-base md:text-lg leading-relaxed text-gray-700 max-w-4xl space-y-4'>
								<p>
									Zionville Global Store Limited is a premier global logistics
									&amp; supply chain solutions provider,&nbsp; specializing in
									seamless cross&#8209;border transportation &amp; customized
									procurement services. With our extensive network &amp;
									industry expertise, we deliver:
								</p>

								<ul className='space-y-3 pl-5 list-disc'>
									<li>
										<span className='font-semibold'>Freight Forwarding</span>{" "}
										&mdash; Comprehensive air, sea, &amp; land transportation
										solutions worldwide
									</li>
									<li>
										<span className='font-semibold'>Customs Clearance</span>{" "}
										&mdash; Efficient regulatory compliance &amp; documentation
										handling
									</li>
									<li>
										<span className='font-semibold'>
											Supply Chain Management
										</span>{" "}
										&mdash; End&#8209;to&#8209;end visibility &amp; optimization
										of your logistics operations
									</li>
									<li>
										<span className='font-semibold'>Procurement Services</span>{" "}
										&mdash; Sourcing of industrial equipment &amp; materials
										with quality assurance
									</li>
									<li>
										<span className='font-semibold'>Warehousing Solutions</span>{" "}
										&mdash; Secure storage with advanced inventory management
										systems
									</li>
									<li>
										<span className='font-semibold'>
											Project Cargo Handling
										</span>{" "}
										&mdash; Specialized transport for oversized &amp;
										heavy&#8209;lift shipments
									</li>
								</ul>

								<p className='pt-2'>
									Our commitment to reliability, transparency, &amp;
									cost&#8209;efficiency makes us the preferred partner for
									businesses expanding their global footprint.
								</p>
							</div>
						</div>
					</div>
					<div className='p-8'>
						<div className='flex gap-4'>
							<div className='flex flex-[.5] flex-col gap-4'>
								<Picture
									src='/images/super-discount-img.png'
									alt=''
									className='rounded-xl object-cover'
								/>
								<Picture
									src='/images/super-discount-img.png'
									alt=''
									className='rounded-xl object-cover'
								/>
							</div>
							<div className='flex-1'>
								<Picture
									src='/images/super-discount-img.png'
									alt=''
									className='rounded-xl object-contain w-full'
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</AppLayout>
	);
};

export default page;
