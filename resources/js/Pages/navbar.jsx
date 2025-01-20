import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-md dark:bg-gray-800 relative z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link 
                        href="/" 
                        className="flex items-center space-x-3 group"
                    >
                        <div className="p-2 rounded-lg   transition-colors duration-300">
                            <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                            Internship Journal Siswa
                        </h1>
                    </Link>

                    <button
                        className="md:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-lg"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>

                    <nav className={`
                        absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto
                        bg-white dark:bg-gray-800
                        shadow-lg md:shadow-none
                        transition-all duration-300 ease-in-out
                        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'}
                        transform ${isOpen ? 'translate-y-0' : '-translate-y-2 md:translate-y-0'}
                        md:flex md:items-center md:space-x-2
                        p-4 md:p-0 rounded-b-lg
                    `}>
                        {auth.user ? (
                            <Link
                                href={route('siswa.dashboard')}
                                className="block md:inline-block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400  rounded-lg transition-all duration-300 text-center font-medium"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('welcome')}
                                    className="block md:inline-block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400  rounded-lg transition-all duration-300 text-center font-medium mb-2 md:mb-0"
                                >
                                    Home
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="block md:inline-block px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400  rounded-lg transition-all duration-300 text-center font-medium mb-2 md:mb-0"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="block md:inline-block px-6 py-3  text-white hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg transition-all duration-300 font-medium text-center"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-200 dark:bg-gray-700"></div>
        </header>
    );
}