import { Head, Link, useForm } from '@inertiajs/react';

type User = { id: number; name: string };

const statuses = ['Draft', 'Planning', 'In Review', 'Approved', 'Completed', 'Cancelled'];
const priorities = ['Low', 'Medium', 'High'];

export default function Create({ users }: { users: User[] }) {
    const { data, setData, post, processing, errors } = useForm({
        case_number: '',
        patient_reference: '',
        surgeon_name: '',
        implant_type: '',
        status: 'Draft',
        priority: 'Medium',
        surgery_date: '',
        assigned_to: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/medical-cases');
    }

    const inputClass = 'w-full rounded-lg border p-3';
    const labelClass = 'mb-1 block font-medium';

    return (
        <>
            <Head title="Create Medical Case" />
            <main className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Create Medical Case</h1>

                <form onSubmit={submit} className="space-y-5">
                    {([
                        ['case_number', 'Case Number'],
                        ['patient_reference', 'Patient Reference'],
                        ['surgeon_name', 'Surgeon Name'],
                        ['implant_type', 'Implant Type'],
                    ] as const).map(([key, label]) => (
                        <div key={key}>
                            <label className={labelClass}>{label}</label>
                            <input
                                required
                                value={data[key]}
                                onChange={(e) => setData(key, e.target.value)}
                                className={inputClass}
                            />
                            {errors[key] && <p className="text-sm text-red-600">{errors[key]}</p>}
                        </div>
                    ))}

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>Status</label>
                            <select required value={data.status} onChange={(e) => setData('status', e.target.value)} className={inputClass}>
                                {statuses.map((status) => <option key={status}>{status}</option>)}
                            </select>
                            {errors.status && <p className="text-sm text-red-600">{errors.status}</p>}
                        </div>

                        <div>
                            <label className={labelClass}>Priority</label>
                            <select required value={data.priority} onChange={(e) => setData('priority', e.target.value)} className={inputClass}>
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

                    <div className="flex gap-3 pt-4">
                        <button disabled={processing} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50">
                            {processing ? 'Saving...' : 'Create Case'}
                        </button>
                        <Link href="/medical-cases" className="rounded-lg border px-5 py-3">Cancel</Link>
                    </div>
                </form>
            </main>
        </>
    );
}