import { Head, Link, useForm } from '@inertiajs/react';

type User = { id: number; name: string };

type MedicalCase = {
    id: number;
    case_number: string;
    patient_reference: string;
    surgeon_name: string;
    implant_type: string;
    status: string;
    priority: string;
    surgery_date: string | null;
    assigned_to: number | null;
};

const statuses = ['Draft', 'Planning', 'In Review', 'Approved', 'Completed', 'Cancelled'];
const priorities = ['Low', 'Medium', 'High'];

export default function Edit({ medicalCase, users }: { medicalCase: MedicalCase; users: User[] }) {
    const { data, setData, put, processing, errors } = useForm({
        case_number: medicalCase.case_number ?? '',
        patient_reference: medicalCase.patient_reference ?? '',
        surgeon_name: medicalCase.surgeon_name ?? '',
        implant_type: medicalCase.implant_type ?? '',
        status: medicalCase.status ?? 'Draft',
        priority: medicalCase.priority ?? 'Medium',
        surgery_date: medicalCase.surgery_date?.slice(0, 10) ?? '',
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
                    <Link href={`/medical-cases/${medicalCase.id}`} className="text-blue-600 hover:underline">View Case</Link>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {([
                        ['case_number', 'Case Number'],
                        ['patient_reference', 'Patient Reference'],
                        ['surgeon_name', 'Surgeon Name'],
                        ['implant_type', 'Implant Type'],
                    ] as const).map(([key, label]) => (
                        <div key={key}>
                            <label className={labelClass}>{label}</label>
                            <input required value={data[key]} onChange={(e) => setData(key, e.target.value)} className={inputClass} />
                            {errors[key] && <p className="text-sm text-red-600">{errors[key]}</p>}
                        </div>
                    ))}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Status</label>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className={inputClass}>
                                {statuses.map((status) => <option key={status}>{status}</option>)}
                            </select>
                            {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Priority</label>
                            <select value={data.priority} onChange={(e) => setData('priority', e.target.value)} className={inputClass}>
                                {priorities.map((priority) => <option key={priority}>{priority}</option>)}
                            </select>
                            {errors.priority && <p className="text-sm text-red-600">{errors.priority}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Surgery Date (Optional)</label>
                        <input type="date" value={data.surgery_date} onChange={(e) => setData('surgery_date', e.target.value)} className={inputClass} />
                        {errors.surgery_date && <p className="text-sm text-red-600">{errors.surgery_date}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Assigned To (Optional)</label>
                        <select value={data.assigned_to} onChange={(e) => setData('assigned_to', e.target.value)} className={inputClass}>
                            <option value="">Unassigned</option>
                            {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
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