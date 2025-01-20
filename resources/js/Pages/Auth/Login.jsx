import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="flex flex-col items-center px-4 sm:px-6 pt-4 sm:pt-6">

                    {/* Card Container */}
                    <div className="w-full max-w-[360px] h-[455px] md:h-[465px] bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-xl shadow-lg p-4 sm:p-6">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                Selamat Datang Kembali
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Masukkan detail akun Anda
                            </p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-3 p-2.5 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <p className="text-sm text-green-600 dark:text-green-400">{status}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-sm text-gray-700 dark:text-gray-300 mb-1" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} className="mt-1" />
                            </div>

                            {/* Password Field */}
                            <div>
                                <InputLabel htmlFor="password" value="Password" className="text-sm text-gray-700 dark:text-gray-300 mb-1" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} className="mt-1" />
                            </div>

                            {/* Remember Me Checkbox */}
                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    Ingat Saya
                                </span>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-2">
                                <PrimaryButton
                                    className="w-full justify-center py-2 text-sm bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-lg shadow-md hover:shadow-indigo-500/20 transition-all duration-200"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        'Masuk'
                                    )}
                                </PrimaryButton>
                            </div>

                            {/* Register Link */}
                            <div className="text-center pt-3">
                                <Link
                                    href={route('register')}
                                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                                >
                                    Belum punya akun?{' '}
                                    <span className="font-semibold">Daftar sekarang</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
