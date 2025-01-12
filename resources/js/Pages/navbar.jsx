import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white  shadow-md">
            <div className="container mx-auto px-2 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-950 ">
                    Internship Journal Siswa
                </h1>
                <button
                    className="text-blue-950  md:hidden"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
                <nav
                    className={`${
                        isOpen ? 'block' : 'hidden'
                    } md:flex items-center space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white  dark:bg-gray-800 md:dark:bg-transparent md:bg-transparent transition-transform transform ${
                        isOpen ? 'translate-y-0 ' : '-translate-y-full'
                    } md:translate-y-0`}
                >
                    {auth.user ? (
                        <Link
                            href={route('siswa.dashboard')}
                            className="text-white md:text-blue-950 text-sm  dark:hover:text-gray-400 transition-all duration-300 ease-in-out"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('welcome')}
                                style={{ borderRadius: '5px' }}
                                className="px-5 py-1 md:text-blue-950 text-white text-sm  hover:text-gray-400 transition-all duration-300 ease-in-out"
                            >
                                Home
                            </Link>
                            <Link
                                href={route('login')}
                                style={{ borderRadius: '5px' }}
                                className="px-5 py-1 md:text-blue-950 text-sm text-white hover:text-gray-400 transition-all duration-300 ease-in-out"
                            >
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-4 py-1 text-sm md:text-blue-950 text-white hover:text-gray-400 transition-all duration-300  ease-in-out"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}