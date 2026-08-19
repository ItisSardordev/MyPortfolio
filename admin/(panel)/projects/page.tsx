'use client';

import { useEffect, useState, useCallback } from 'react';
import { fetchProjects } from '@/lib/queries';
import { supabase } from '@/lib/supabase';
import type { Project, ProjectInput } from '@/lib/types';
import { Plus, Trash2, Pencil, X, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

const emptyProject: ProjectInput = {
  title: '',
  category: '',
  year: '',
  description: '',
  image: '',
  technologies: [],
  github_url: '',
  demo_url: '',
  sort_order: 0,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<ProjectInput>(emptyProject);
  const [techInput, setTechInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setForm({ ...emptyProject, sort_order: projects.length + 1 });
    setTechInput('');
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (p: Project) => {
    const { id: _id, created_at: _c, ...rest } = p;
    void _id;
    void _c;
    setForm(rest);
    setTechInput('');
    setEditing(p);
    setCreating(false);
  };

  const closeForm = () => {
    setEditing(null);
    setCreating(false);
    setForm(emptyProject);
    setTechInput('');
    setError('');
  };

  const addTech = () => {
    const tech = techInput.trim();
    if (!tech) return;
    if (!form.technologies.includes(tech)) {
      setForm({ ...form, technologies: [...form.technologies, tech] });
    }
    setTechInput('');
  };

  const removeTech = (tech: string) => {
    setForm({
      ...form,
      technologies: form.technologies.filter((t) => t !== tech),
    });
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('projects')
          .update(form)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert(form);
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

  const handleDelete = async (p: Project) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('projects').delete().eq('id', p.id);
    if (error) {
      setError(error.message);
      return;
    }
    load();
  };

  const moveProject = async (p: Project, direction: 'up' | 'down') => {
    const index = projects.findIndex((x) => x.id === p.id);
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= projects.length) return;

    const other = projects[swapIndex];
    const updates = [
      { id: p.id, sort_order: other.sort_order },
      { id: other.id, sort_order: p.sort_order },
    ];

    for (const u of updates) {
      const { error } = await supabase
        .from('projects')
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
          <h1 className="font-serif text-3xl text-paper">Projects</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 border border-paper px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          <Plus className="h-4 w-4" />
          New Project
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
              {editing ? 'Edit Project' : 'New Project'}
            </h2>
            <button
              onClick={closeForm}
              className="text-paper-muted transition-colors hover:text-paper"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Title">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="admin-input"
                placeholder="Aurora"
              />
            </Field>
            <Field label="Category">
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="admin-input"
                placeholder="Design System"
              />
            </Field>
            <Field label="Year">
              <input
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="admin-input"
                placeholder="2025"
              />
            </Field>
            <Field label="Sort Order">
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })
                }
                className="admin-input"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="admin-input resize-none"
                  placeholder="Project description..."
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Image URL">
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="admin-input"
                  placeholder="https://..."
                />
              </Field>
              {form.image && (
                <div className="mt-3 overflow-hidden rounded border border-hairline">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <Field label="Technologies">
                <div className="flex gap-2">
                  <input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech();
                      }
                    }}
                    className="admin-input"
                    placeholder="Type a tech and press Enter"
                  />
                  <button
                    onClick={addTech}
                    type="button"
                    className="border border-hairline px-4 font-mono text-xs text-paper-muted transition-colors hover:text-paper"
                  >
                    Add
                  </button>
                </div>
                {form.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {form.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-2 rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-paper-muted"
                      >
                        {tech}
                        <button
                          onClick={() => removeTech(tech)}
                          className="text-paper-dim hover:text-paper"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>
            </div>
            <Field label="GitHub URL">
              <input
                value={form.github_url}
                onChange={(e) =>
                  setForm({ ...form, github_url: e.target.value })
                }
                className="admin-input"
                placeholder="https://github.com/..."
              />
            </Field>
            <Field label="Demo URL">
              <input
                value={form.demo_url}
                onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                className="admin-input"
                placeholder="https://..."
              />
            </Field>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {editing ? 'Save Changes' : 'Create Project'}
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
        ) : projects.length === 0 ? (
          <div className="py-12 text-center font-mono text-xs text-paper-dim">
            No projects yet. Click "New Project" to add one.
          </div>
        ) : (
          projects.map((project, i) => (
            <div
              key={project.id}
              className="group flex items-center gap-4 border-b border-hairline py-5"
            >
              <span className="w-8 font-mono text-xs text-paper-dim">
                {String(project.sort_order).padStart(2, '0')}
              </span>
              <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded border border-hairline">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="font-serif text-lg text-paper">
                  {project.title}
                </div>
                <div className="font-mono text-xs text-paper-muted">
                  {project.category} · {project.year}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveProject(project, 'up')}
                  disabled={i === 0}
                  className="p-2 text-paper-dim transition-colors hover:text-paper disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveProject(project, 'down')}
                  disabled={i === projects.length - 1}
                  className="p-2 text-paper-dim transition-colors hover:text-paper disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => openEdit(project)}
                  className="p-2 text-paper-dim transition-colors hover:text-paper"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(project)}
                  className="p-2 text-paper-dim transition-colors hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        :global(.admin-input) {
          width: 100%;
          border-bottom: 1px solid rgba(245, 243, 239, 0.08);
          background: transparent;
          padding: 0.625rem 0;
          color: #f5f3ef;
          font-size: 0.875rem;
        }
        :global(.admin-input:focus) {
          outline: none;
          border-color: #f5f3ef;
        }
        :global(.admin-input::placeholder) {
          color: #5a5a54;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-muted">
        {label}
      </label>
      {children}
    </div>
  );
}
