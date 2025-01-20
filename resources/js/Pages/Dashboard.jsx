import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/footer';

export default function Dashboard() {
    const { auth, recentJournals = [], recentAbsensi = [], statistics = {}, tasks = [], announcements = [] } = usePage().props;
    const user = auth.user;

    const pengumuman = {
        title: 'Pengumuman',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
    
    
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 leading-tight">
                    <span className="text-indigo-600 dark:text-indigo-400">Selamat Datang</span> {user.name} <br />
                    Anda Sekarang sedang prakerin di <span className="text-emerald-600 dark:text-emerald-400">{user.company ? user.company.company : 'Belum Ditentukan'}</span>
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mt-12 text-sm  md:px-0">
                <div className="mx-auto max-w-8xl sm:px-6 lg:px-8 px-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-xl font-bold mb-6 text-indigo-700 dark:text-indigo-400">Ringkasan Aktivitas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        Jurnal Terbaru
                                    </h4>
                                    <ul className="space-y-2">
                                        {recentJournals.length > 0 ? (
                                            recentJournals.map(journal => (
                                                <li key={journal.id} className="p-2 bg-white/10 rounded-lg">{journal.title} - {journal.date}</li>
                                            ))
                                        ) : (
                                            <li className="p-2 bg-white/10 rounded-lg">Tidak ada jurnal terbaru</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        Absensi Terbaru
                                    </h4>
                                    <ul className="space-y-2">
                                        {recentAbsensi.length > 0 ? (
                                            recentAbsensi.map(absen => (
                                                <li key={absen.id} className="p-2 bg-white/10 rounded-lg">{absen.date} - {absen.information}</li>
                                            ))
                                        ) : (
                                            <li className="p-2 bg-white/10 rounded-lg">Tidak ada absensi terbaru</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                    <h4 className="text-lg font-bold mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                        Statistik
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="p-2 bg-white/10 rounded-lg">Hari Prakerin: {statistics.days || 0}</li>
                                        <li className="p-2 bg-white/10 rounded-lg">Jurnal Ditulis: {statistics.journals || 0}</li>
                                        <li className="p-2 bg-white/10 rounded-lg">Kehadiran: {statistics.attendance || 0}</li>
                                    </ul>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mt-10 mb-6 text-red-700 dark:text-red-400">Tugas atau Pengingat</h3>
                            <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
                                <ul className="space-y-2">
                                    {tasks.length > 0 ? (
                                        tasks.map(task => (
                                            <li key={task.id} className="p-2 bg-white/10 rounded-lg flex items-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                {task.title} - {task.due_date}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-2 bg-white/10 rounded-lg">Tidak ada tugas atau pengingat</li>
                                    )}
                                </ul>
                            </div>

                            <h3 className="text-xl font-bold mt-10 mb-6 text-purple-700 dark:text-purple-400">Pengumuman</h3>
                            <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-xl shadow-lg">
                                {pengumuman.title ? (
                                    <>
                                        <div className="p-2 bg-white/10 rounded-lg">{pengumuman.title}</div>
                                        <div className="p-2 bg-white/10 rounded-lg mt-2">{pengumuman.description}</div>
                                    </>
                                ) : (
                                    <div className="p-2 bg-white/10 rounded-lg">Tidak ada pengumuman</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}