import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type MedicalCase = {
    id: number;
    case_number: string;
    patient_reference: string;
    surgeon_name: string;
    implant_type: string;
    status: string;
    priority: string;
    surgery_date: string | null;
    created_at: string;
    assigned_user?: { id: number; name: string } | null;
    creator?: { id: number; name: string } | null;
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

type DashboardStats = {
    total: number;
    planning: number;
    inReview: number;
    approved: number;
    completed: number;
};

type Props = {
    cases: PaginatedCases;
    dashboard: DashboardStats;
    filters: {
        search?: string;
        status?: string;
        priority?: string;
        sort?: string;
        direction?: string;
    };
    canManage: boolean;
};

const statuses = [
    'Draft',
    'Planning',
    'In Review',
    'Approved',
    'Completed',
    'Cancelled',
];

const priorities = ['Low', 'Medium', 'High'];

const statusStyles: Record<string, string> = {
    Draft: 'bg-slate-100 text-slate-700',
    Planning: 'bg-blue-100 text-blue-700',
    'In Review': 'bg-amber-100 text-amber-700',
    Approved: 'bg-violet-100 text-violet-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    Cancelled: 'bg-red-100 text-red-700',
};

const priorityStyles: Record<string, string> = {
    Low: 'bg-slate-100 text-slate-700',
    Medium: 'bg-orange-100 text-orange-700',
    High: 'bg-red-100 text-red-700',
};

export default function MedicalCasesIndex({
    cases,
    dashboard,
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
                search: search.trim(),
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

    function changeSort(column: string) {
        const direction =
            filters.sort === column && filters.direction === 'asc'
                ? 'desc'
                : 'asc';

        router.get(
            '/medical-cases',
            {
                search: search.trim(),
                status,
                priority,
                sort: column,
                direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function sortLabel(column: string, label: string) {
        if (filters.sort !== column) {
            return label;
        }

        return `${label} ${filters.direction === 'asc' ? '↑' : '↓'}`;
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
                            Manage and track patient-specific implant cases.
                        </p>
                    </div>

                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        <StatCard
                            label="Total Cases"
                            value={dashboard.total}
                            icon="▤"
                            color="blue"
                        />
                        <StatCard
                            label="Planning"
                            value={dashboard.planning}
                            icon="◷"
                            color="amber"
                        />
                        <StatCard
                            label="In Review"
                            value={dashboard.inReview}
                            icon="↗"
                            color="violet"
                        />
                        <StatCard
                            label="Approved"
                            value={dashboard.approved}
                            icon="✓"
                            color="emerald"
                        />
                        <StatCard
                            label="Completed"
                            value={dashboard.completed}
                            icon="✓"
                            color="emerald"
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
                                        Search by case number or surgeon, then
                                        filter and sort the results.
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
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search case number or surgeon..."
                                    aria-label="Search case number or surgeon"
                                    className="min-w-0 rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <select
                                    value={status}
                                    onChange={(event) =>
                                        setStatus(event.target.value)
                                    }
                                    aria-label="Filter by status"
                                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="">All statuses</option>
                                    {statuses.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={priority}
                                    onChange={(event) =>
                                        setPriority(event.target.value)
                                    }
                                    aria-label="Filter by priority"
                                    className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                                >
                                    <option value="">All priorities</option>
                                    {priorities.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
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
                            <table className="w-full min-w-[1050px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeSort('case_number')
                                                }
                                            >
                                                {sortLabel(
                                                    'case_number',
                                                    'Case Number',
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Patient Reference
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeSort('surgeon_name')
                                                }
                                            >
                                                {sortLabel(
                                                    'surgeon_name',
                                                    'Surgeon',
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            Implant Type
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeSort('priority')
                                                }
                                            >
                                                {sortLabel(
                                                    'priority',
                                                    'Priority',
                                                )}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeSort('status')
                                                }
                                            >
                                                {sortLabel('status', 'Status')}
                                            </button>
                                        </th>
                                        <th className="px-6 py-4 font-semibold">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    changeSort('surgery_date')
                                                }
                                            >
                                                {sortLabel(
                                                    'surgery_date',
                                                    'Surgery Date',
                                                )}
                                            </button>
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
                                                {medicalCase.patient_reference}
                                            </td>

                                            <td className="px-6 py-4">
                                                {medicalCase.surgeon_name}
                                            </td>

                                            <td className="max-w-56 truncate px-6 py-4 text-slate-600">
                                                {medicalCase.implant_type}
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
                                                    {medicalCase.priority}
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
                                                    {medicalCase.status}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                                {medicalCase.surgery_date
                                                    ? medicalCase.surgery_date.slice(
                                                          0,
                                                          10,
                                                      )
                                                    : '—'}
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
                                                colSpan={8}
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
                                        onClick={() => {
                                            if (link.url) {
                                                router.visit(link.url);
                                            }
                                        }}
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
}: {
    label: string;
    value: number;
    icon: string;
    color: string;
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
        </div>
    );
}
