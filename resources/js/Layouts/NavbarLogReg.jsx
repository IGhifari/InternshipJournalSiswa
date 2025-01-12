import { Link } from '@inertiajs/react';


export default function NavbarLogReg({ auth }){
    return(
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-800 text-sm">
            <h1 className="text-xl font-semibold text-gray-200">
                Internship Journal Siswa
            </h1>
            <nav className="flex items-center space-x-4">
                    <>
                        <Link
                            href={route('welcome')}
                            style={{borderRadius: '5px'}}
                            className="px-5 py-1 text-white   hover:text-gray-400 transition-all duration-300 ease-in-out"
                        >
                            Home
                        </Link>
                        <Link
                            href={route('filament.admin.auth.login')}
                            style={{borderRadius: '5px'}}
                            className="px-5 py-1 text-white   hover:text-gray-400 transition-all duration-300 ease-in-out"
                        >
                            Admin
                        </Link>
                    </>
            </nav>
        </header>
    );
}