import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
export default function Edit({ mustVerifyEmail, status, auth}) {
    const  user = usePage().props.auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className=" font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile {user.students ? user.students.name : 'Belum Ditentukan'}
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className='text-white text-center'>
                        <p className=" font-semibold text-sm md:text-xl">
                            Halaman ini digunakan untuk mengatur dan mengelola informasi profil Anda.
                        </p>
                        <p className="text-sm">
                            Pastikan Anda mengisi semua informasi yang diperlukan dan simpan perubahan Anda.
                        </p>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ml-3 mr-3 md:ml-0 md:mr-0">
                        <div className='text-white '>
                                Informasi Anda 
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 pt-1">
                                Berikut adalah informasi tentang Anda.
                            </p>
                        </div>
                        <div className='mt-5'>
                            <h2 className='text-white text-sm'>
                                NIS : {user.students ? user.students.nis : 'Belum Ditentukan'} <br />
                                Nama : {user.name} <br />
                                Kelas : {user.students ? user.students.class : 'Belum Ditentukan'} <br />
                                No. Hp : {user.students ? user.students.phone : 'Belum Ditentukan'} <br />
                                Email : {user.students ? user.students.email : 'Belum Ditentukan'} <br />
                                Status : {user.students ? user.students.status_pkl : 'Belum Ditentukan'} <br />
                                Anda mulai PKL pada tanggal : {user.students ? user.students.mulai_pkl : 'Belum Ditentukan'} <br />
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ml-3 mr-3 md:ml-0 md:mr-0">
                        <div className='text-white '>
                                Informasi Perusahaan
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 pt-1">
                            Berikut adalah detail perusahaan tempat Anda melakukan prakerin.
                            </p>
                        </div>
                        <div className='text-white text-sm mt-5'>
                            <h2>
                                Perusahaan : {user.company ? user.company.company : 'Belum Ditentukan'}
                                <br />
                                Alamat : {user.company ? user.company.addres : 'Belum Ditentukan'}
                                <br /> 
                                Nama Supervisor : {user.company?.supervisor ? user.company.supervisor.supervisor_name : 'Belum Ditentukan'}
                                <br /> 
                                No. Telepon Perusahaan : {user.company ? user.company.phone : 'Belum Ditentukan'}
                                <br />
                                Email Perusahaan : {user.company ? user.company.email : 'Belum Ditentukan'}
                                <br /> 
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ml-3 mr-3 md:ml-0 md:mr-0">
                        <div className='text-white '>
                                Informasi Supervisor
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 pt-1">
                            Berikut adalah informasi tentang Supervisor.
                            </p>
                        </div>
                        <div className='text-white text-sm mt-5'>
                            <h2>
                                Nama Supervisor : {user.company?.supervisor ? user.company.supervisor.supervisor_name : 'Belum Ditentukan'}
                                <br /> 
                                No. Telepon Supervisor : {user.company?.supervisor ? user.company.supervisor.phone : 'Belum Ditentukan'}
                                <br />
                                Company : {user.company?.supervisor?.company ? user.company.supervisor.company.company : 'Belum Ditentukan'}
                                <br />
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ml-3 mr-3 md:ml-0 md:mr-0">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ml-3 mr-3 md:ml-0 md:mr-0">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ml-3 mr-3 md:ml-0 md:mr-0">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
