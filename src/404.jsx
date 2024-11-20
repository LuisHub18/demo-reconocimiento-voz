import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="text-center mt-12 font-sans text-gray-800">
            <h1 className="text-6xl mb-5">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link to="/" className="text-lg text-blue-500 no-underline">
                Go to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;