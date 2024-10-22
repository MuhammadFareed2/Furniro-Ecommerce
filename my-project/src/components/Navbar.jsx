import React, { useState, useEffect } from 'react';
import Logo from "../assets/images/logo.png";
import Account from "../assets/icons/Account.svg";
import Lens from "../assets/icons/MagnifyingGlass.svg";
import Heart from "../assets/icons/Heart.svg";
import Cart from "../assets/icons/Cart.svg";
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Auth } from '../firebase/firebase';

const Navbar = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(Auth, (User) => {
            if (User) {
                setUser(User);
                console.log('User is signed in:', User);
            } else {
                setUser(null);
                console.log('No user is signed in.');
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(Auth).then(() => {
            console.log('User signed out successfully');
        }).catch((error) => {
            console.error('Error signing out:', error);
        });
    };

    return (
        <>
            <div className='flex justify-between items-center px-4 py-6 sm:px-6 lg:px-[54px]'>

                <div className='flex'>
                    <img src={Logo} alt="Logo" className='h-[30px] sm:h-[41px]' />
                </div>

                <div className='hidden md:flex gap-6 lg:gap-12'>
                    <Link to='/' className='text-[14px] sm:text-[16px] font-medium flex items-center'>Home</Link>
                    <Link to='/shop' className='text-[14px] sm:text-[16px] font-medium flex items-center'>Shop</Link>
                    <Link to='/about' className='text-[14px] sm:text-[16px] font-medium flex items-center'>About</Link>
                    <Link to='/contact' className='text-[14px] sm:text-[16px] font-medium flex items-center'>Contact</Link>
                </div>

                <div className='flex gap-6 sm:gap-8 lg:gap-12 items-center'>
                    {user ? (
                        <button onClick={handleLogout} className='text-[14px] sm:text-[16px] font-medium'>Logout</button>
                    ) : (
                        <Link to="/signup">
                            <img src={Account} alt="Account" className='h-5 sm:h-7' />
                        </Link>
                    )}
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
                <Link to='/about' className='text-[14px] font-medium'>About</Link>
                <Link to='/contact' className='text-[14px] font-medium'>Contact</Link>
            </div>
        </>
    );
}

export default Navbar;
