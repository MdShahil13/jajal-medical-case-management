
import { Head, Link, useForm } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
};

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
    assigned_to: number | null;
};

export default function Edit({
    medicalCase,
    users,
}: {
    medicalCase: MedicalCase;
    users: User[];
}) {
    const { data, setData, put, processing, errors } = useForm({
        case_number: medicalCase.case_number ?? '',
        patient_name: medicalCase.patient_name ?? '',
        patient_email: medicalCase.patient_email ?? '',
        patient_phone: medicalCase.patient_phone ?? '',
        condition: medicalCase.condition ?? '',
        description: medicalCase.description ?? '',
        status: medicalCase.status ?? 'open',
        priority: medicalCase.priority ?? 'medium',
        opened_at: medicalCase.opened_at?.slice(0, 10) ?? '',
        closed_at: medicalCase.closed_at?.slice(0, 10) ?? '',
        assigned_to: medicalCase.assigned_to?.toString() ?? '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        put(`/medical-cases/${medicalCase.id}`);
    }

    const inputClass = 'w-full rounded-lg border p-3';
    const labelClass = 'mb-1 block font-medium';

    return (
        <>
            <Head title={`Edit ${medicalCase.case_number}`} />

            <main className="mx-auto max-w-3xl p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h1 className="text-3xl font-bold">Edit Medical Case</h1>
                    <Link href={`/medical-cases/${medicalCase.id}`} className="text-blue-600 hover:underline">
                        View Case
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className={labelClass}>Case Number</label>
                        <input required value={data.case_number} onChange={(e) => setData('case_number', e.target.value)} className={inputClass} />
                        {errors.case_number && <p className="text-sm text-red-600">{errors.case_number}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Patient Name</label>
                        <input required value={data.patient_name} onChange={(e) => setData('patient_name', e.target.value)} className={inputClass} />
                        {errors.patient_name && <p className="text-sm text-red-600">{errors.patient_name}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Patient Email</label>
                        <input type="email" value={data.patient_email} onChange={(e) => setData('patient_email', e.target.value)} className={inputClass} />
                        {errors.patient_email && <p className="text-sm text-red-600">{errors.patient_email}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Patient Phone</label>
                        <input value={data.patient_phone} onChange={(e) => setData('patient_phone', e.target.value)} className={inputClass} />
                        {errors.patient_phone && <p className="text-sm text-red-600">{errors.patient_phone}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Condition</label>
                        <input required value={data.condition} onChange={(e) => setData('condition', e.target.value)} className={inputClass} />
                        {errors.condition && <p className="text-sm text-red-600">{errors.condition}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} className={inputClass} />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Status</label>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className={inputClass}>
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                            {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Priority</label>
                            <select value={data.priority} onChange={(e) => setData('priority', e.target.value)} className={inputClass}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Opened Date</label>
                            <input type="date" value={data.opened_at} onChange={(e) => setData('opened_at', e.target.value)} className={inputClass} />
                            {errors.opened_at && <p className="text-sm text-red-600">{errors.opened_at}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Closed Date</label>
                            <input type="date" value={data.closed_at} onChange={(e) => setData('closed_at', e.target.value)} className={inputClass} />
                            {errors.closed_at && <p className="text-sm text-red-600">{errors.closed_at}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Assigned To</label>
                        <select value={data.assigned_to} onChange={(e) => setData('assigned_to', e.target.value)} className={inputClass}>
                            <option value="">Unassigned</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        {errors.assigned_to && <p className="text-sm text-red-600">{errors.assigned_to}</p>}
                    </div>

                    <div className="flex gap-3">
                        <button disabled={processing} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link href="/medical-cases" className="rounded-lg border px-5 py-3">Cancel</Link>
                    </div>
                </form>
            </main>
        </>
    );
}
