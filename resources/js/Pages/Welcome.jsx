import { Head, Link } from '@inertiajs/react';
import Navbar from './navbar';
import Gambar from '@/assets/pkl.jpg';
import Footer from '@/Components/footer';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <Navbar auth={auth} />

                <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
                            <div className="space-y-4">
                                <span className="inline-block mr-36 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold animate-pulse text-left md:text-center">
                                    ✨ Platform PKL Terbaik
                                </span>
                                <div className="space-y-2">
                                    <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300 leading-tight">
                                        Selamat Datang di Internship Journal Siswa
                                    </h2>
                                </div>
                            </div>

                            {/* Enhanced Subtitle with gradient underline */}
                            <div className="relative">
                                <p className="text-sm md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    <span className="text-indigo-600  dark:text-indigo-400 font-semibold">Satu Platform</span> untuk mengelola data PKL siswa secara efisien dan mudah.
                                    <span className="block mt-2 text-gray-500 dark:text-gray-400">
                                        Tingkatkan pengalaman magang Anda dengan sistem manajemen yang modern.
                                    </span>
                                </p>
                                <div className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-transparent"></div>
                            </div>

                            {/* Enhanced CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link
                                    href={route('login')}
                                    className="group px-8 py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 text-white rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 hover:scale-105"
                                >
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span className="font-semibold">Masuk Sekarang</span>
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="group px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
                                >
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    <span className="font-semibold">Daftar</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Smaller Image */}
                        <div className="w-full md:w-1/2 max-w-md mx-auto">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-3xl rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500"></div>
                                    <img
                                        src={Gambar}
                                        alt="Internship"
                                        className="relative rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 object-cover w-full h-[300px]"
                                    />
                                    {/* Decorative Elements */}
                                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-50 blur-xl animate-pulse"></div>
                                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full opacity-50 blur-xl animate-pulse delay-150"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="mt-32 space-y-8">
                        <div className="text-center space-y-4 mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                Fitur Unggulan
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Nikmati berbagai fitur yang memudahkan pengelolaan PKL Anda
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>}
                                title="Manajemen Mudah"
                                description="Kelola data PKL dengan mudah dan efisien melalui interface yang user-friendly"
                            />
                            <FeatureCard
                                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>}
                                title="Real-time Tracking"
                                description="Pantau perkembangan PKL secara real-time dengan sistem pelaporan yang terintegrasi"
                            />
                            <FeatureCard
                                icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>}
                                title="Keamanan Data"
                                description="Data PKL Anda aman dengan sistem keamanan yang terjamin"
                            />
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
    <div className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-indigo-500 mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
);
