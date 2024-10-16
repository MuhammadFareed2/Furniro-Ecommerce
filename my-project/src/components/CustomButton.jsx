import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({ text, styles, to,}) => {
    return (
        <Link to={to} className={`${styles} inline-block`}>
            {text}
        </Link>
    );
};

export default CustomButton;
