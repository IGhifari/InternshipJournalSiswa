import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, auth}) {
    const user = usePage().props.auth.user;
    
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800/40 rounded-full">
                            <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-50">
                                Profile
                            </h2>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                                {user.students?.name || 'Belum Ditentukan'}
                            </p>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="px-4 py-1.5 bg-blue-100 dark:bg-blue-800/40 rounded-full">
                            <span className="text-sm text-gray-900 dark:text-gray-50">
                                {user.students?.status_pkl || 'Status PKL'}
                            </span>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-8 md:py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 text-gray-800 dark:text-gray-100 text-center shadow-lg'>
                        <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                            Selamat Datang di Halaman Profil
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
                            Halaman ini digunakan untuk mengatur dan mengelola informasi profil Anda.
                            Pastikan Anda mengisi semua informasi yang diperlukan dan simpan perubahan Anda.
                        </p>
                    </div>

                    {/* Personal Information Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Informasi Pribadi
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                                <InfoItem label="NIS" value={user.students?.nis} />
                                <InfoItem label="Nama" value={user.name} />
                                <InfoItem label="Kelas" value={user.students?.class} />
                                <InfoItem label="No. HP" value={user.students?.phone} />
                                <InfoItem label="Email" value={user.students?.email} />
                                <InfoItem label="Status" value={user.students?.status_pkl} />
                                <InfoItem label="Mulai PKL" value={user.students?.mulai_pkl} span={2} />
                            </div>
                        </div>
                    </div>

                    {/* Company Information Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Informasi Perusahaan
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                                <InfoItem label="Perusahaan" value={user.company?.company} />
                                <InfoItem label="Alamat" value={user.company?.addres} />
                                <InfoItem label="Nama Supervisor" value={user.company?.supervisor?.supervisor_name} />
                                <InfoItem label="No. Telepon" value={user.company?.phone} />
                                <InfoItem label="Email" value={user.company?.email} />
                            </div>
                        </div>
                    </div>

                    {/* Supervisor Information Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Informasi Supervisor
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                                <InfoItem label="Nama Supervisor" value={user.company?.supervisor?.supervisor_name} />
                                <InfoItem label="No. Telepon" value={user.company?.supervisor?.phone} />
                                <InfoItem label="Perusahaan" value={user.company?.supervisor?.company?.company} />
                            </div>
                        </div>
                    </div>

                    {/* Form Sections */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Component untuk menampilkan item informasi
const InfoItem = ({ label, value, span = 1 }) => (
    <div className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-lg ${span === 2 ? 'md:col-span-2' : ''}`}>
        <span className="font-medium text-gray-600 dark:text-gray-300">{label}: </span>
        <span className="text-gray-800 dark:text-gray-100">{value || 'Belum Ditentukan'}</span>
    </div>
);
