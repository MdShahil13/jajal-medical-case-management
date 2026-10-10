
import { Head, Link } from '@inertiajs/react';

type MedicalCase = {
    id: number;
    case_number: string;
    patient_name: string;
    patient_email: string | null;
    patient_phone: string | null;
    condition: string;
    description: string | null;
    status: string;
    priority: string;
    opened_at: string | null;
    closed_at: string | null;
    assigned_user: { id: number; name: string } | null;
    creator: { id: number; name: string } | null;
    created_at: string;
    updated_at: string;
};

export default function Show({
    medicalCase,
    canManage,
}: {
    medicalCase: MedicalCase;
    canManage: boolean;
}) {
    const fields: [string, string][] = [
        ['Patient Name', medicalCase.patient_name],
        ['Patient Email', medicalCase.patient_email || '—'],
        ['Patient Phone', medicalCase.patient_phone || '—'],
        ['Condition', medicalCase.condition],
        ['Description', medicalCase.description || '—'],
        ['Status', medicalCase.status.replace('_', ' ')],
        ['Priority', medicalCase.priority],
        ['Opened Date', medicalCase.opened_at?.slice(0, 10) || '—'],
        ['Closed Date', medicalCase.closed_at?.slice(0, 10) || '—'],
        ['Assigned To', medicalCase.assigned_user?.name || 'Unassigned'],
        ['Created By', medicalCase.creator?.name || '—'],
        ['Created At', medicalCase.created_at?.slice(0, 10) || '—'],
    ];

    return (
        <>
            <Head title={`Case ${medicalCase.case_number}`} />

            <main className="mx-auto max-w-4xl p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Medical Case</p>
                        <h1 className="text-3xl font-bold">{medicalCase.case_number}</h1>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/medical-cases" className="rounded-lg border px-4 py-2">
                            Back to Cases
                        </Link>
                        {canManage && (
                            <Link href={`/medical-cases/${medicalCase.id}/edit`} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                                Edit Case
                            </Link>
                        )}
                    </div>
                </div>

                <section className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="mb-6 flex flex-wrap gap-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                            {medicalCase.status.replace('_', ' ')}
                        </span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                            {medicalCase.priority} priority
                        </span>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {fields.map(([label, value]) => (
                            <div key={label}>
                                <p className="text-sm text-gray-500">{label}</p>
                                <p className="mt-1 whitespace-pre-wrap font-medium text-gray-900">{value}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
