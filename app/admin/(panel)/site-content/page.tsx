'use client';

import { useEffect, useState } from 'react';
import { fetchSiteContent } from '@/lib/queries';
import { supabase } from '@/lib/supabase';
import type { SiteContent } from '@/lib/types';
import { Loader2, Check, AlertCircle } from 'lucide-react';

export default function AdminSiteContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSiteContent()
      .then(setContent)
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof SiteContent, value: string | string[]) => {
    if (!content) return;
    setContent({ ...content, [field]: value });
    setSaved(false);
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const { id: _id, updated_at: _u, ...data } = content;
      void _id;
      void _u;
      const { error } = await supabase
        .from('site_content')
        .update(data)
        .eq('id', 1);
      if (error) throw error;
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-paper-muted" />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="py-24 text-center font-mono text-xs text-paper-dim">
        No site content found.
      </div>
    );
  }

  const rolesText = content.roles.join('\n');

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-3xl text-paper">Site Content</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
            Edit all text shown across the portfolio
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : null}
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 border border-red-900/50 bg-red-950/20 px-4 py-3 font-mono text-xs text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="mt-10 space-y-12">
        <Section title="Home">
          <Field label="Name (shown in nav + footer)">
            <input
              value={content.name}
              onChange={(e) => update('name', e.target.value)}
              className="sc-input"
            />
          </Field>
          <Field label="Hero Roles (one per line)">
            <textarea
              value={rolesText}
              onChange={(e) =>
                update(
                  'roles',
                  e.target.value.split('\n').filter((r) => r.trim())
                )
              }
              rows={3}
              className="sc-input resize-none"
            />
          </Field>
          <Field label="Intro Paragraph">
            <textarea
              value={content.intro}
              onChange={(e) => update('intro', e.target.value)}
              rows={3}
              className="sc-input resize-none"
            />
          </Field>
        </Section>

        <Section title="About">
          <Field label="Headline (large serif statement)">
            <textarea
              value={content.about_headline}
              onChange={(e) => update('about_headline', e.target.value)}
              rows={2}
              className="sc-input resize-none"
            />
          </Field>
          <Field label="Biography — Paragraph 1">
            <textarea
              value={content.about_bio}
              onChange={(e) => update('about_bio', e.target.value)}
              rows={4}
              className="sc-input resize-none"
            />
          </Field>
          <Field label="Biography — Paragraph 2">
            <textarea
              value={content.about_bio_2}
              onChange={(e) => update('about_bio_2', e.target.value)}
              rows={3}
              className="sc-input resize-none"
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Experience">
              <input
                value={content.experience}
                onChange={(e) => update('experience', e.target.value)}
                className="sc-input"
              />
            </Field>
            <Field label="Location">
              <input
                value={content.location}
                onChange={(e) => update('location', e.target.value)}
                className="sc-input"
              />
            </Field>
            <Field label="Currently">
              <input
                value={content.currently}
                onChange={(e) => update('currently', e.target.value)}
                className="sc-input"
              />
            </Field>
            <Field label="Available">
              <input
                value={content.available}
                onChange={(e) => update('available', e.target.value)}
                className="sc-input"
              />
            </Field>
          </div>
        </Section>

        <Section title="Design Philosophy">
          <Field label="Headline">
            <textarea
              value={content.design_philosophy_headline}
              onChange={(e) => update('design_philosophy_headline', e.target.value)}
              rows={2}
              className="sc-input resize-none"
            />
          </Field>
          <Field label="Body">
            <textarea
              value={content.design_philosophy_body}
              onChange={(e) => update('design_philosophy_body', e.target.value)}
              rows={4}
              className="sc-input resize-none"
            />
          </Field>
        </Section>

        <Section title="Development Philosophy">
          <Field label="Headline">
            <textarea
              value={content.dev_philosophy_headline}
              onChange={(e) => update('dev_philosophy_headline', e.target.value)}
              rows={2}
              className="sc-input resize-none"
            />
          </Field>
          <Field label="Body">
            <textarea
              value={content.dev_philosophy_body}
              onChange={(e) => update('dev_philosophy_body', e.target.value)}
              rows={4}
              className="sc-input resize-none"
            />
          </Field>
        </Section>

        <Section title="Contact">
          <Field label="Headline">
            <input
              value={content.contact_headline}
              onChange={(e) => update('contact_headline', e.target.value)}
              className="sc-input"
            />
          </Field>
          <Field label="Body Paragraph">
            <textarea
              value={content.contact_body}
              onChange={(e) => update('contact_body', e.target.value)}
              rows={3}
              className="sc-input resize-none"
            />
          </Field>
          <Field label="Email Address">
            <input
              value={content.contact_email}
              onChange={(e) => update('contact_email', e.target.value)}
              className="sc-input"
            />
          </Field>
        </Section>

        <Section title="Footer">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Left Text (copyright)">
              <input
                value={content.footer_left}
                onChange={(e) => update('footer_left', e.target.value)}
                className="sc-input"
              />
            </Field>
            <Field label="Right Text (credits)">
              <input
                value={content.footer_right}
                onChange={(e) => update('footer_right', e.target.value)}
                className="sc-input"
              />
            </Field>
          </div>
        </Section>
      </div>

      <div className="mt-12 border-t border-hairline pt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 border border-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : null}
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save All Changes'}
        </button>
      </div>

      <style jsx>{`
        :global(.sc-input) {
          width: 100%;
          border-bottom: 1px solid rgba(245, 243, 239, 0.08);
          background: transparent;
          padding: 0.625rem 0;
          color: #f5f3ef;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        :global(.sc-input:focus) {
          outline: none;
          border-color: #f5f3ef;
        }
        :global(.sc-input::placeholder) {
          color: #5a5a54;
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-hairline pl-6">
      <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-paper-muted">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-paper-dim">
        {label}
      </label>
      {children}
    </div>
  );
}
