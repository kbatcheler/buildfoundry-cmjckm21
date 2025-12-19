import { useState } from 'react';
import { toast } from '@/components/ui/toast';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <Input
        label="Name"
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <Input
        label="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Textarea
        label="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        rows={4}
        required
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}