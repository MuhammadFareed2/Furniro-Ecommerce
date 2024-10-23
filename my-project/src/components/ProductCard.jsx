import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ index, image, imageAlt, name, currency, currentPrice, typeName }) => {
    return (
        <Link 
            to={`/shop/${index}`} 
            className='w-[90%] sm:w-[285px] h-[500px] mt-6 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out' 
            key={index}
        >
            <img src={image} alt={imageAlt} className='w-full h-[300px] object-cover transition-opacity duration-200' />
            <div className='p-4'>
                <h1 className='text-lg font-semibold text-gray-900 leading-tight truncate'>{name}</h1>
                <p className='text-base text-gray-700 mt-2'>
                    Price: <span className='text-xl font-bold text-green-600'>{currency} {currentPrice}</span>
                </p>
                <h2 className='text-sm text-gray-500 mt-4'>{typeName}</h2>
            </div>
        </Link>
    );
}

export default ProductCard;
