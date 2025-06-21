import { useEffect, useState } from 'react';
import {
  fetchInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from './api/invoice';
import type { Invoice } from './api/invoice';
import './index.css';

export default function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<{ customerNo: number; description: string }>({
    customerNo: 0,
    description: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const loadInvoices = () => {
    setLoading(true);
    fetchInvoices()
      .then(setInvoices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateInvoice(editingId, form);
        setEditingId(null);
      } else {
        await createInvoice(form);
      }
      setForm({ customerNo: 0, description: '' });
      loadInvoices();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (invoice: Invoice) => {
    setForm({ customerNo: invoice.customerNo, description: invoice.description });
    setEditingId(invoice.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      try {
        await deleteInvoice(id);
        loadInvoices();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">📄 Invoice Tracker</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer No
            </label>
            <input
              type="number"
              value={form.customerNo}
              onChange={(e) =>
                setForm({ ...form, customerNo: parseInt(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
            >
              {editingId ? 'Update Invoice' : 'Add Invoice'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ customerNo: 0, description: '' });
                }}
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* ERROR */}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* TABLE */}
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="overflow-auto rounded border border-gray-200">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Created At</th>
                  <th className="px-4 py-2 border">Customer No</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-500">
                      No invoices found.
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-2 border text-xs text-gray-500">
                        {invoice.id}
                      </td>
                      <td className="px-4 py-2 border">
                        {new Date(invoice.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">{invoice.customerNo}</td>
                      <td className="px-4 py-2 border">{invoice.description}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEdit(invoice)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
