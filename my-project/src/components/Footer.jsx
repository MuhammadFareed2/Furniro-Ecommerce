import React from 'react';
import CustomButton from './CustomButton';
import Furniro from "../assets/images/Furniro.png";
import FooterTop from "../assets/images/footerTop.png";

const Footer = () => {
    return (
        <>
            <img src={FooterTop} alt="" className='w-full' />
            <footer className='bg-gray-100 py-8 px-4 sm:px-6 lg:px-16'>
                <div className='flex flex-col md:flex-row md:justify-between md:space-x-8'>
                    {/* Address Section */}
                    <div className='mb-6 md:mb-0'>
                        <img src={Furniro} alt="Furniro logo" className='mb-4 h-10 w-auto' />
                        <address className='not-italic font-normal text-sm leading-relaxed text-center md:text-left'>
                            400 University Drive Suite 200<br />
                            Coral Gables, FL 33134 USA
                        </address>
                    </div>

                    <div className='mb-6 md:mb-0'>
                        <h4 className='font-semibold text-sm mb-4 text-center md:text-left'>Links</h4>
                        <nav className='flex flex-col items-center md:items-start'>
                            <CustomButton text="Home" styles="text-base font-medium mb-2" to="/" />
                            <CustomButton text="Shop" styles="text-base font-medium mb-2" to="/shop" />
                            <CustomButton text="About" styles="text-base font-medium mb-2" to="/about" />
                            <CustomButton text="Contact" styles="text-base font-medium mb-2" to="/contact" />
                        </nav>
                    </div>

                    <div className='mb-6 md:mb-0'>
                        <h4 className='font-semibold text-sm mb-4 text-center md:text-left'>Help</h4>
                        <nav className='flex flex-col items-center md:items-start'>
                            <CustomButton text="Payment Options" styles="text-base font-medium mb-2" to="/payment-options" />
                            <CustomButton text="Returns" styles="text-base font-medium mb-2" to="/returns" />
                            <CustomButton text="Privacy Policies" styles="text-base font-medium mb-2" to="/privacy" />
                        </nav>
                    </div>

                    <div className='mb-6 md:mb-0'>
                        <h4 className='font-semibold text-sm mb-4 text-center md:text-left'>Newsletter</h4>
                        <form className='flex flex-col sm:flex-row items-center border-b border-black pb-3'>
                            <input
                                type="email"
                                placeholder='Enter Your Email Address'
                                className='bg-transparent outline-none text-sm mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto'
                            />
                            <CustomButton text="Subscribe" styles="text-sm font-medium" to="#" /> {/* Replace # with actual subscription link if needed */}
                        </form>
                    </div>
                </div>

                <div className='text-center mt-8'>
                    <p className='font-normal text-sm'>© 2023 Furniro. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;
