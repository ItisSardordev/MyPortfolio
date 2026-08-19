'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchSocials } from '@/lib/queries';
import { supabase } from '@/lib/supabase';
import type { Social, SocialInput } from '@/lib/types';
import { Plus, Trash2, Pencil, X, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

const emptySocial: SocialInput = {
  label: '',
  href: '',
  handle: '',
  sort_order: 0,
};

export default function AdminSocialsPage() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Social | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<SocialInput>(emptySocial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    fetchSocials()
      .then(setSocials)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...emptySocial, sort_order: socials.length + 1 });
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (s: Social) => {
    const { id: _id, created_at: _c, ...rest } = s;
    void _id;
    void _c;
    setForm(rest);
    setEditing(s);
    setCreating(false);
  };

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
    setForm(emptySocial);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('socials')
          .update(form)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('socials').insert(form);
        if (error) throw error;
      }
      closeForm();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (s: Social) => {
    if (!confirm(`Delete "${s.label}"?`)) return;
    const { error } = await supabase.from('socials').delete().eq('id', s.id);
    if (error) {
      setError(error.message);
      return;
    }
    load();
  };

  const moveSocial = async (s: Social, direction: 'up' | 'down') => {
    const index = socials.findIndex((x) => x.id === s.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= socials.length) return;

    const other = socials[swapIndex];
    const updates = [
      { id: s.id, sort_order: other.sort_order },
      { id: other.id, sort_order: s.sort_order },
    ];

    for (const u of updates) {
      const { error } = await supabase
        .from('socials')
        .update({ sort_order: u.sort_order })
        .eq('id', u.id);
      if (error) {
        setError(error.message);
        return;
      }
    }
    load();
  };

  const formOpen = creating || editing;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-paper">Social Links</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
            {socials.length} link{socials.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 border border-paper px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <Plus className="h-4 w-4" />
          New Link
        </button>
      </div>

      {error && (
        <div className="mt-6 border border-red-900/50 bg-red-950/20 px-4 py-3 font-mono text-xs text-red-400">
          {error}
        </div>
      )}

      {formOpen && (
        <div className="mt-8 border border-hairline bg-ink-soft p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-xl text-paper">
              {editing ? 'Edit Link' : 'New Link'}
            </h2>
            <button
              onClick={closeForm}
              className="text-paper-muted transition-colors hover:text-paper"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-muted">
                Label
              </label>
              <input
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full border-b border-hairline bg-transparent py-2.5 text-sm text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none"
                placeholder="GitHub"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-muted">
                Handle
              </label>
              <input
                value={form.handle}
                onChange={(e) => setForm({ ...form, handle: e.target.value })}
                className="w-full border-b border-hairline bg-transparent py-2.5 text-sm text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none"
                placeholder="@adriancole"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-muted">
                URL
              </label>
              <input
                value={form.href}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                className="w-full border-b border-hairline bg-transparent py-2.5 text-sm text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-muted">
                Sort Order
              </label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                }
                className="w-full border-b border-hairline bg-transparent py-2.5 text-sm text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? 'Save Changes' : 'Create Link'}
            </button>
            <button
              onClick={closeForm}
              className="border border-hairline px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper-muted transition-colors hover:text-paper"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-hairline">
        {loading ? (
          <div className="py-12 text-center font-mono text-xs text-paper-dim">
            Loading...
          </div>
        ) : socials.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-paper-dim">
            No social links yet.
          </div>
        ) : (
          socials.map((social, i) => (
            <div
              key={social.id}
              className="group flex items-center gap-4 border-b border-hairline py-5"
            >
              <span className="w-8 font-mono text-xs text-paper-dim">
                {String(social.sort_order).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="font-serif text-lg text-paper">
                  {social.label}
                </div>
                <div className="font-mono text-xs text-paper-muted">
                  {social.handle}
                </div>
              </div>
              <span className="hidden font-mono text-xs text-paper-dim md:block">
                {social.href}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSocial(social, 'up')}
                  disabled={i === 0}
                  className="p-2 text-paper-dim transition-colors hover:text-paper disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveSocial(social, 'down')}
                  disabled={i === socials.length - 1}
                  className="p-2 text-paper-dim transition-colors hover:text-paper disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openEdit(social)}
                  className="p-2 text-paper-dim transition-colors hover:text-paper"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(social)}
                  className="p-2 text-paper-dim transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
