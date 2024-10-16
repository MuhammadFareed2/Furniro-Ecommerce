import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ index, image, imageAlt, name, currency, currentPrice, typeName }) => {
    return (
        <Link to={`/shop/${index}`} className='w-[90%] sm:w-[285px] h-[446px] mt-6 bg-[#F4F5F7]' key={index}>
            <img src={image} alt={imageAlt} className='w-full h-auto' />
            <h1 className='text-2xl font-semibold'>{name}</h1>
            <p className='text-base font-medium'>Price: {currency} {currentPrice}</p>
            <h1 className='text-2xl font-semibold'>{typeName}</h1>
        </Link>
    );
}

export default ProductCard;
