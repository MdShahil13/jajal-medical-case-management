
import { Head, Link, useForm } from '@inertiajs/react';

type User = { id: number; name: string };

export default function Create({ users }: { users: User[] }) {
    const { data, setData, post, processing, errors } = useForm({
        case_number: '',
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        condition: '',
        description: '',
        status: 'open',
        priority: 'medium',
        opened_at: new Date().toISOString().slice(0, 10),
        closed_at: '',
        assigned_to: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/medical-cases');
    }

    return (
        <>
            <Head title="Create Medical Case" />
            <main className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Create Medical Case</h1>
                <form onSubmit={submit} className="space-y-4">
                    {([
                        ['case_number', 'Case Number'],
                        ['patient_name', 'Patient Name'],
                        ['patient_email', 'Patient Email'],
                        ['patient_phone', 'Patient Phone'],
                        ['condition', 'Condition'],
                    ] as const).map(([key, label]) => (
                        <div key={key}>
                            <label className="mb-1 block font-medium">{label}</label>
                            <input
                                required={key !== 'patient_email' && key !== 'patient_phone'}
                                type={key === 'patient_email' ? 'email' : 'text'}
                                value={data[key]}
                                onChange={(e) => setData(key, e.target.value)}
                                className="w-full rounded-lg border p-3"
                            />
                            {errors[key] && <p className="text-sm text-red-600">{errors[key]}</p>}
                        </div>
                    ))}

                    <div>
                        <label className="mb-1 block font-medium">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded-lg border p-3"
                        />
                        {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block font-medium">Status</label>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="w-full rounded-lg border p-3">
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block font-medium">Priority</label>
                            <select value={data.priority} onChange={(e) => setData('priority', e.target.value)} className="w-full rounded-lg border p-3">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block font-medium">Opened Date</label>
                            <input type="date" value={data.opened_at} onChange={(e) => setData('opened_at', e.target.value)} className="w-full rounded-lg border p-3" />
                        </div>
                        <div>
                            <label className="mb-1 block font-medium">Assigned To</label>
                            <select value={data.assigned_to} onChange={(e) => setData('assigned_to', e.target.value)} className="w-full rounded-lg border p-3">
                                <option value="">Unassigned</option>
                                {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                            </select>
                            {errors.assigned_to && <p className="text-sm text-red-600">{errors.assigned_to}</p>}
                        </div>
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
