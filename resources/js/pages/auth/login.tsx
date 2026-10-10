
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        post('/login');
    }

    return (
        <>
            <Head title="Sign in" />

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
                <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
                    <section className="hidden flex-col justify-between bg-blue-700 p-10 text-white md:flex">
                        <div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl">
                                ✚
                            </div>
                            <h1 className="mt-8 text-3xl font-bold">Jajal Medical</h1>
                            <p className="mt-3 leading-7 text-blue-100">
                                Medical Case Management
                            </p>
                        </div>
                        <p className="text-sm leading-6 text-blue-100">
                            A central workspace to track cases, monitor priorities,
                            and coordinate case management.
                        </p>
                    </section>

                    <section className="p-7 sm:p-10">
                        <div className="mb-8 md:hidden">
                            <h1 className="text-2xl font-bold text-slate-900">
                                Jajal Medical
                            </h1>
                        </div>

                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Welcome back
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            Sign in
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Enter your account details to continue.
                        </p>

                        <form onSubmit={submit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    required
                                    autoFocus
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={(event) => setData('password', event.target.value)}
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    placeholder="Enter your password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Signing in…' : 'Sign in'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs text-slate-400">
                            Authorized demo users only · Keep credentials private
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}
