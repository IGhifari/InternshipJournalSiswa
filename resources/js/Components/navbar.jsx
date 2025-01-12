import React from "react"


export default function navbar() {
    return(
        <div>
              <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md dark:bg-gray-800 h-16">
                    <h1 className="text-xl font-semibold text-yellow-500">
                        Internship Journal Siswa
                    </h1>
                    <nav className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 text-white bg-gray-700 rounded-md shadow-md hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
        </div>
    )

}