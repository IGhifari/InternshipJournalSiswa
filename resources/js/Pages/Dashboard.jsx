import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/footer';

export default function Dashboard() {
    const { auth, recentJournals = [], recentAbsensi = [], statistics = {}, tasks = [], announcements = [] } = usePage().props;
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-sm md:text-base text-gray-800 dark:text-gray-200 leading-tight">
                    Selamat Datang {user.name} <br />
                    Anda Sekarang sedang prakerin di {user.company ? user.company.company : 'Belum Ditentukan'}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 text-sm px-4 md:px-0">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-semibold mb-4">Ringkasan Aktivitas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold">Jurnal Terbaru</h4>
                                    <ul>
                                        {recentJournals.length > 0 ? (
                                            recentJournals.map(journal => (
                                                <li key={journal.id}>{journal.title} - {journal.date}</li>
                                            ))
                                        ) : (
                                            <li>Tidak ada jurnal terbaru</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold">Absensi Terbaru</h4>
                                    <ul>
                                        {recentAbsensi.length > 0 ? (
                                            recentAbsensi.map(absen => (
                                                <li key={absen.id}>{absen.date} - {absen.information}</li>
                                            ))
                                        ) : (
                                            <li>Tidak ada absensi terbaru</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                                    <h4 className="text-lg font-semibold">Statistik</h4>
                                    <ul>
                                        <li>Hari Prakerin: {statistics.days || 0}</li>
                                        <li>Jurnal Ditulis: {statistics.journals || 0}</li>
                                        <li>Kehadiran: {statistics.attendance || 0}</li>
                                    </ul>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mt-8 mb-4">Tugas atau Pengingat</h3>
                            <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                                <ul>
                                    {tasks.length > 0 ? (
                                        tasks.map(task => (
                                            <li key={task.id}>{task.title} - {task.due_date}</li>
                                        ))
                                    ) : (
                                        <li>Tidak ada tugas atau pengingat</li>
                                    )}
                                </ul>
                            </div>
                            <h3 className="text-lg font-semibold mt-8 mb-4">Pengumuman</h3>
                            <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
                                <ul>
                                    {announcements.length > 0 ? (
                                        announcements.map(announcement => (
                                            <li key={announcement.id}>{announcement.title} - {announcement.date}</li>
                                        ))
                                    ) : (
                                        <li>Tidak ada pengumuman</li>
                                    )}
                                </ul>
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