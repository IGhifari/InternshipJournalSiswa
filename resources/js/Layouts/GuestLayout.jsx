import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavbarLogReg from './NavbarLogReg';
import Footer from '@/Components/footer';

export default function GuestLayout({ children, auth }) {
    return (
        <div  className='dark:bg-gray-900 h-full md:h-screen'>
            <NavbarLogReg auth={auth} />
            <div style={{height: '80vh'}}  className="flex  flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-gray-900">
                
                <div>
                    <h1 className="h-20 text-2xl pt-12 fill-current text-gray-500">
                        Internship Journal Siswa
                    </h1>
                </div>

                <div  className="mt-6 sm:w-full  overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800 ">
                    {children}
                    
                </div>
            </div>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}
