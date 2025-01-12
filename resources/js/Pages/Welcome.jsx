    import { Head, Link } from '@inertiajs/react';
    import Navbar from './navbar';
    import Gambar from '@/assets/pkl.jpg';
    import TypeIt from 'typeit-react';
    export default function Welcome({ auth }) {
        return (
            <>
                <Head title="Home" />
                <div className=" text-gray-800 min-h-screen flex flex-col ">
                    <Navbar auth={auth} />

                    <main className="flex flex-1 items-center justify-center text-center gap-12 flex-col md:flex-row">

                        <div className="px-6 max-w-2xl space-y-6">
                            <h2 className="md:text-4xl font-bold text-gray-800 text-2xl">
                                <TypeIt  
                                            options={{ loop: true, loopDelay: 2000, speed: 100 }} // Loop dan pengaturan delay
                                            getBeforeInit={(instance) => {
                                                instance
                                                    .type("Selamat datang di Internship Journal Siswa") // Warna biru hanya untuk teks ini
                                                    .pause(750)
                                                    .delete(2)
                                                    .pause(500)
                                                    .type("wa");
                                                return instance;
                                            }}
                                        />
                            </h2>
                            <p className="text-sm md:text-lg text-gray-600 ">
                                Platform untuk mengelola data PKL siswa secara efisien dan mudah. 
                                <br />Silakan masuk atau daftar untuk melanjutkan.
                            </p>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="py-4 text-center text-sm text-gray-700 dark:text-gray-700">
                        <p>&copy; {new Date().getFullYear()} Internship Journal. Semua Hak Dilindungi.</p>
                        <div className="flex justify-center gap-6">
                            <Link href="/privacy-policy" className="hover:text-gray-500 transition-all duration-300">Kebijakan Privasi</Link>
                            <Link href="/about" className="hover:text-gray-500 transition-all duration-300">Tentang Kami</Link>
                        </div>
                    </footer>
                </div>
            </>
        );
    }
