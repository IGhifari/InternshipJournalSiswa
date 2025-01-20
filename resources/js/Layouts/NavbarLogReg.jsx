import { Link } from '@inertiajs/react';


export default function NavbarLogReg({ auth }){
    return(
        <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-white shadow-md dark:bg-gray-800 text-sm">
            <h1 className="text-lg md:text-xl font-semibold text-gray-200 mb-3 md:mb-0">
                Internship Journal Siswa
            </h1>
            <nav className="flex items-center space-x-2 md:space-x-4">
                <>
                    <Link
                        href={route('welcome')}
                        style={{borderRadius: '5px'}}
                        className="px-3 md:px-5 py-2 text-white  hover:text-gray-200 transition-all duration-300 ease-in-out"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>Home</span>
                        </span>
                    </Link>
                    <Link
                        href={route('filament.admin.auth.login')}
                        style={{borderRadius: '5px'}}
                        className="px-3 md:px-5 py-2 text-white  hover:text-gray-200 transition-all duration-300 ease-in-out"
                    >
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Admin</span>
                        </span>
                    </Link>
                </>
            </nav>
        </header>
    );
}