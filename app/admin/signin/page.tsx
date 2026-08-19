'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { session, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && session) {
      router.push('/admin');
    }
  }, [session, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push('/admin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/admin');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="h-6 w-6 animate-spin text-paper-muted" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-12">
          <h1 className="font-serif text-3xl text-paper">
            {mode === 'signin' ? 'Admin Sign In' : 'Create Account'}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-paper-muted">
            Portfolio Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-hairline bg-transparent py-3 font-sans text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-[0.15em] text-paper-muted">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full border-b border-hairline bg-transparent py-3 font-sans text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 border border-paper py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setError('');
          }}
          className="mt-8 font-mono text-xs text-paper-muted transition-colors hover:text-paper"
        >
          {mode === 'signin'
            ? "Don't have an account? Sign up →"
            : 'Already have an account? Sign in →'}
        </button>

        <div className="mt-12 border-t border-hairline pt-8">
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-[0.15em] text-paper-dim transition-colors hover:text-paper"
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
