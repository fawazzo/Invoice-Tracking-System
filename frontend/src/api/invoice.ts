const API_BASE = 'http://localhost:3000';

export interface Invoice {
  id: string;
  createdAt: string;
  customerNo: number;
  description: string;
}

export async function fetchInvoices(): Promise<Invoice[]> {
  const res = await fetch(`${API_BASE}/invoices`);
  if (!res.ok) throw new Error('Failed to fetch invoices');
  return res.json();
}

export async function createInvoice(data: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice> {
  const res = await fetch(`${API_BASE}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create invoice');
  return res.json();
}

export async function updateInvoice(id: string, data: Partial<Omit<Invoice, 'id' | 'createdAt'>>): Promise<Invoice> {
  const res = await fetch(`${API_BASE}/invoices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update invoice');
  return res.json();
}

export async function deleteInvoice(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/invoices/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete invoice');
}
