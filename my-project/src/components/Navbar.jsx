import React from 'react'
import Logo from "../assets/images/logo.png"
import Account from "../assets/icons/Account.svg"
import Lens from "../assets/icons/MagnifyingGlass.svg"
import Heart from "../assets/icons/Heart.svg"
import Cart from "../assets/icons/Cart.svg"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='flex justify-between items-center px-4 py-6 sm:px-6 lg:px-[54px]'>
                
                <div className='flex'>
                    <img src={Logo} alt="Logo" className='h-[30px] sm:h-[41px]' />
                </div>

              
                <div className='hidden md:flex gap-6 lg:gap-12'>
                    <Link to='/' className='text-[14px] sm:text-[16px] font-medium flex items-center'>Home</Link>         
                    <Link to='/shop' className='text-[14px] sm:text-[16px] font-medium flex items-center'>Shop</Link>
                    <button className='text-[14px] sm:text-[16px] font-medium flex items-center'>About</button>
                    <button className='text-[14px] sm:text-[16px] font-medium flex items-center'>Contact</button>
                </div>

           
                <div className='flex gap-6 sm:gap-8 lg:gap-12 items-center'>
                    <Link to="/signin">
                        <img src={Account} alt="Account" className='h-5 sm:h-7' />
                    </Link>
                    <img src={Lens} alt="Search" className='h-5 sm:h-7' />
                    <img src={Heart} alt="Favorites" className='h-5 sm:h-7' />
                    <Link to="/cart">
                        <img src={Cart} alt="Cart" className='h-5 sm:h-7' />
                    </Link>
                </div>
            </div>

         
            <div className='flex flex-col md:hidden items-center gap-4 px-4 py-2'>
                <Link to='/' className='text-[14px] font-medium'>Home</Link>
                <Link to='/shop' className='text-[14px] font-medium'>Shop</Link>
                <button className='text-[14px] font-medium'>About</button>
                <button className='text-[14px] font-medium'>Contact</button>
            </div>
        </>
    )
}

export default Navbar