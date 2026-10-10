
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type MedicalCase = {
    id: number;
    case_number: string;
    patient_name: string;
    condition: string;
    status: string;
    priority: string;
    opened_at: string | null;
    assigned_user?: { id: number; name: string } | null;
};

type PaginatedCases = {
    data: MedicalCase[];
    current_page: number;
    last_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: { url: string | null; label: string; active: boolean }[];
};

type Props = {
    cases: PaginatedCases;
    filters: {
        search?: string;
        status?: string;
        priority?: string;
        sort?: string;
        direction?: string;
    };
    canManage: boolean;
};

const statusStyles: Record<string, string> = {
    open: 'bg-blue-100 text-blue-700',
    in_progress: 'bg-amber-100 text-amber-700',
    closed: 'bg-emerald-100 text-emerald-700',
};

const priorityStyles: Record<string, string> = {
    low: 'bg-slate-100 text-slate-700',
    medium: 'bg-orange-100 text-orange-700',
    high: 'bg-red-100 text-red-700',
};

function formatLabel(value: string) {
    return value.replaceAll('_', ' ').replace(/\b\w/g, (letter) =>
        letter.toUpperCase(),
    );
}

export default function MedicalCasesIndex({
    cases,
    filters,
    canManage,
}: Props) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [priority, setPriority] = useState(filters.priority ?? '');

   
function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    router.get(
        '/medical-cases',
        {
            search: search.trim() || '',
            status,
            priority,
            sort: filters.sort || 'created_at',
            direction: filters.direction || 'desc',
        },
        {
            preserveState: false,
            preserveScroll: true,
            replace: true,
        },
    );
}

function clearFilters() {
    setSearch('');
    setStatus('');
    setPriority('');

    router.get(
        '/medical-cases',
        {},
        {
            preserveState: false,
            preserveScroll: true,
            replace: true,
        },
    );
}


    function deleteCase(id: number, caseNumber: string) {
        if (
            window.confirm(
                `Delete case ${caseNumber}? This cannot be undone.`,
            )
        ) {
            router.delete(`/medical-cases/${id}`);
        }
    }

    return (
        <>
            <Head title="Medical Cases" />

            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <Link
                            href="/medical-cases"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                                ✚
                            </div>

                            <div>
                                <h1 className="text-lg font-bold tracking-tight">
                                    Jajal Medical
                                </h1>
                                <p className="text-xs text-slate-500">
                                    Case Management System
                                </p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3">
                            <span className="hidden text-sm text-slate-500 sm:inline">
                                {canManage ? 'Administrator' : 'Viewer'}
                            </span>

                            {canManage && (
                                <Link
                                    href="/medical-cases/create"
                                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    + New Case
                                </Link>
                            )}

                            <button
                                type="button"
                                onClick={() => router.post('/logout')}
                                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Overview
                        </p>
                        <h2 className="mt-1 text-3xl font-bold tracking-tight">
                            Medical Cases
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage and track patient cases from one place.
                        </p>
                    </div>

                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            label="Total Cases"
                            value={cases.total}
                            icon="▤"
                            color="blue"
                        />
                        <StatCard
                            label="Open Cases"
                            value={cases.data.filter(
                                (c) => c.status === 'open',
                            ).length}
                            icon="◷"
                            color="amber"
                            hint="On this page"
                        />
                        <StatCard
                            label="In Progress"
                            value={cases.data.filter(
                                (c) => c.status === 'in_progress',
                            ).length}
                            icon="↗"
                            color="violet"
                            hint="On this page"
                        />
                        <StatCard
                            label="Closed Cases"
                            value={cases.data.filter(
                                (c) => c.status === 'closed',
                            ).length}
                            icon="✓"
                            color="emerald"
                            hint="On this page"
                        />
                    </section>

                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-100 p-5 sm:p-6">
                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                <div>
                                    <h3 className="text-lg font-bold">
                                        All Cases
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Search, filter, and review medical
                                        records.
                                    </p>
                                </div>

                                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                                    {cases.total} records
                                </span>
                            </div>

                            <form
                                onSubmit={applyFilters}
                                className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4"
                            >
                                <input
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search case, patient, condition..."
                                    className="min-w-0 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <select
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value)
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="">All statuses</option>
                                    <option value="open">Open</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="closed">Closed</option>
                                </select>

                                <select
                                    value={priority}
                                    onChange={(e) =>
                                        setPriority(e.target.value)
                                    }
                                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="">All priorities</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
                                    >
                                        Apply filters
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium hover:bg-slate-50"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[850px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">
                                            Case
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Patient
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Condition
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Priority
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Opened
                                        </th>
                                        <th className="px-6 py-4 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {cases.data.map((medicalCase) => (
                                        <tr
                                            key={medicalCase.id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={`/medical-cases/${medicalCase.id}`}
                                                    className="font-semibold text-blue-700 hover:text-blue-900"
                                                >
                                                    {medicalCase.case_number}
                                                </Link>
                                            </td>

                                            <td className="px-6 py-4 font-medium">
                                                {medicalCase.patient_name}
                                            </td>

                                            <td className="max-w-56 truncate px-6 py-4 text-slate-600">
                                                {medicalCase.condition}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        priorityStyles[
                                                            medicalCase.priority
                                                        ] ??
                                                        'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    {formatLabel(
                                                        medicalCase.priority,
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                        statusStyles[
                                                            medicalCase.status
                                                        ] ??
                                                        'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    {formatLabel(
                                                        medicalCase.status,
                                                    )}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                                {medicalCase.opened_at ?? '—'}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <Link
                                                        href={`/medical-cases/${medicalCase.id}`}
                                                        className="font-medium text-blue-700 hover:underline"
                                                    >
                                                        View
                                                    </Link>

                                                    {canManage && (
                                                        <>
                                                            <Link
                                                                href={`/medical-cases/${medicalCase.id}/edit`}
                                                                className="font-medium text-slate-600 hover:underline"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    deleteCase(
                                                                        medicalCase.id,
                                                                        medicalCase.case_number,
                                                                    )
                                                                }
                                                                className="font-medium text-red-600 hover:underline"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {cases.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-16 text-center"
                                            >
                                                <div className="text-3xl">
                                                    ⌕
                                                </div>
                                                <p className="mt-3 font-semibold">
                                                    No cases found
                                                </p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Try changing your search or
                                                    filters.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
                            <p className="text-sm text-slate-500">
                                Showing {cases.from ?? 0}–{cases.to ?? 0} of{' '}
                                {cases.total} cases
                            </p>

                            <div className="flex flex-wrap gap-1">
                                {cases.links.map((link, index) => (
                                    <button
                                        key={`${index}-${link.label}`}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.visit(link.url)
                                        }
                                        className={`min-w-9 rounded-lg border px-3 py-2 text-sm ${
                                            link.active
                                                ? 'border-blue-600 bg-blue-600 text-white'
                                                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        } disabled:cursor-not-allowed disabled:opacity-40`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <p className="text-center text-xs text-slate-400">
                        Jajal Medical Case Management · Demo records only
                    </p>
                </main>
            </div>
        </>
    );
}

function StatCard({
    label,
    value,
    icon,
    color,
    hint,
}: {
    label: string;
    value: number;
    icon: string;
    color: string;
    hint?: string;
}) {
    const colors: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-700',
        amber: 'bg-amber-50 text-amber-700',
        violet: 'bg-violet-50 text-violet-700',
        emerald: 'bg-emerald-50 text-emerald-700',
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${colors[color]}`}
                >
                    {icon}
                </div>
            </div>

            <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>

            {hint && (
                <p className="mt-1 text-xs text-slate-400">{hint}</p>
            )}
        </div>
    );
}
