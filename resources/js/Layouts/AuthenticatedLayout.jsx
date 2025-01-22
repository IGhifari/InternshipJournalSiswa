import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CgProfile, CgClose } from 'react-icons/cg';
import { BiSolidLogOut } from 'react-icons/bi';
import { FaHome, FaClipboardList, FaBook } from 'react-icons/fa';

const AuthenticatedLayout = ({ header, children }) => {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 relative">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 shadow-lg relative z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link className="flex shrink-0 items-center text-white font-bold text-xl" href={route('welcome')}>
                                Internship Journal Siswa
                            </Link>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink href={route('siswa.dashboard')} active={route().current('siswa.dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('absensi.index')} active={route().current('absensi.index')}>
                                    Absensi
                                </NavLink>
                                <NavLink href={route('jurnal.index')} active={route().current('jurnal.index')}>
                                    Jurnal Harian Anda
                                </NavLink>
                            </div>
                        </div>
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md items-center">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                        >
                                            {user.name}
                                            <CgProfile size={30} className="ml-2" />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <div className="flex flex-col">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <CgProfile size={20} className="text-gray-500" />
                                            <span>Profile</span>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('welcome')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <FaHome size={20} className="text-gray-500" />
                                            <span>Home</span>
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <BiSolidLogOut size={20} className="text-gray-500" />
                                            <span>Log Out</span>
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((prev) => !prev)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${showingNavigationDropdown ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className={`absolute top-0 left-0 w-full bg-white dark:bg-gray-800 transition-transform transform ${showingNavigationDropdown ? 'translate-y-0' : '-translate-y-full'} shadow-lg z-50`}>
                        <div className="flex justify-between items-center p-4">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Menu</h2>
                            <button
                                onClick={() => setShowingNavigationDropdown(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <CgClose size={24} />
                            </button>
                        </div>
                        <div className="space-y-1 pb-3 pt-2">
                            <ResponsiveNavLink href={route('siswa.dashboard')} active={route().current('siswa.dashboard')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FaHome size={20} />
                                <span>Dashboard</span>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('absensi.index')} active={route().current('absensi.index')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FaClipboardList size={20} />
                                <span>Absensi</span>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('jurnal.index')} active={route().current('jurnal.index')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FaBook size={20} />
                                <span>Jurnal Harian Anda</span>
                            </ResponsiveNavLink>
                            <ResponsiveNavLink href={route('logout')} method="post" as="button" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <BiSolidLogOut size={20} />
                                <span>Log out</span>
                            </ResponsiveNavLink>
                            <div className="border-t border-gray-200 my-2" />
                            <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                <CgProfile size={20} />
                                <span>Profile</span>
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
};

export default AuthenticatedLayout;
