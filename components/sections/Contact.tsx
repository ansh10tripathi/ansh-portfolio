'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin, Github, Linkedin, ChevronDown, Check } from 'lucide-react';
import { PERSONAL } from '@/lib/constants';
import { fadeUp, slideLeft, slideRight } from '@/lib/animations';
import type { ContactFormData } from '@/types';

const SUBJECTS = ['Collaboration', 'Opportunity', 'General', 'Other'];

/** Fully custom dark-themed select dropdown — no native browser styling */
function SubjectSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen((o) => !o); }
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = SUBJECTS.indexOf(value);
      onChange(SUBJECTS[(idx + 1) % SUBJECTS.length]);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = SUBJECTS.indexOf(value);
      onChange(SUBJECTS[(idx - 1 + SUBJECTS.length) % SUBJECTS.length]);
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="w-full flex items-center justify-between px-4 py-[0.875rem] rounded-xl text-sm font-dm transition-all duration-200 text-left"
        style={{
          background: 'rgba(10,10,20,0.85)',
          border: `1px solid ${open ? 'rgba(0,245,255,0.45)' : 'rgba(255,255,255,0.08)'}`,
          color: '#F0F4FF',
          boxShadow: open ? '0 0 20px rgba(0,245,255,0.12)' : 'none',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span>{value}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <ChevronDown size={15} style={{ color: '#00F5FF' }} />
        </motion.span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              transformOrigin: 'top',
              background: 'rgba(10,10,22,0.97)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 24px rgba(0,245,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
            className="absolute z-50 w-full mt-1.5 rounded-xl overflow-hidden py-1"
          >
            {SUBJECTS.map((subject) => {
              const active = subject === value;
              return (
                <li
                  key={subject}
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(subject); setOpen(false); }}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-dm cursor-pointer transition-all duration-150"
                  style={{
                    color: active ? '#00F5FF' : '#8B92B8',
                    background: active ? 'rgba(0,245,255,0.07)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.color = active ? '#00F5FF' : '#F0F4FF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = active ? 'rgba(0,245,255,0.07)' : 'transparent';
                    (e.currentTarget as HTMLElement).style.color = active ? '#00F5FF' : '#8B92B8';
                  }}
                >
                  {subject}
                  {active && <Check size={13} style={{ color: '#00F5FF' }} />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Contact section with form and social links */
export function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', subject: 'General', message: '' });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const e: Partial<ContactFormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: 'General', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">&lt; Contact /&gt;</p>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--text-primary)]">
            Let&apos;s Build <span className="gradient-text">Something</span>
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
            Whether it&apos;s AI research, a project collab, or an opportunity — I&apos;d love to connect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {[
              { icon: Mail, label: PERSONAL.email, href: `mailto:${PERSONAL.email}`, action: copyEmail, actionLabel: copied ? '✓ Copied!' : 'Copy' },
              { icon: Phone, label: PERSONAL.phone, href: `tel:${PERSONAL.phone}` },
              { icon: MapPin, label: 'Punjab, India', href: null },
            ].map(({ icon: Icon, label, href, action, actionLabel }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.2)' }}
                >
                  <Icon size={16} style={{ color: '#00F5FF' }} />
                </div>
                <div className="flex-1 min-w-0">
                  {href ? (
                    <a href={href} className="text-sm text-[var(--text-primary)] hover:text-[#00F5FF] transition-colors truncate block">
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--text-primary)]">{label}</span>
                  )}
                </div>
                {action && (
                  <button
                    onClick={action}
                    className="text-xs font-outfit px-2 py-1 rounded-md transition-colors"
                    style={{ color: '#00F5FF', background: 'rgba(0,245,255,0.1)' }}
                  >
                    {actionLabel}
                  </button>
                )}
              </div>
            ))}

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {[
                { href: PERSONAL.github, icon: Github, label: 'GitHub', color: '#fff' },
                { href: `https://${PERSONAL.linkedin}`, icon: Linkedin, label: 'LinkedIn', color: '#0A66C2' },
              ].map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-outfit font-medium transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)',
                  }}
                  whileHover={{ borderColor: `${color}40`, color, scale: 1.02 }}
                  data-cursor={label.toLowerCase()}
                >
                  <Icon size={16} />
                  {label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle size={64} style={{ color: '#10B981' }} />
                  </motion.div>
                  <h3 className="font-syne font-bold text-2xl text-[var(--text-primary)]">Message Sent!</h3>
                  <p className="text-[var(--text-secondary)]">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                      />
                      {errors.name && <p className="text-xs text-[#F43F5E] mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                      />
                      {errors.email && <p className="text-xs text-[#F43F5E] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <SubjectSelect
                    value={form.subject}
                    onChange={(v) => setForm({ ...form, subject: v })}
                  />

                  {/* Message */}
                  <div>
                    <textarea
                      placeholder="Your message..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                    />
                    {errors.message && <p className="text-xs text-[#F43F5E] mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-outfit font-semibold text-base transition-all duration-200 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))',
                      border: '1px solid rgba(0,245,255,0.3)',
                      color: '#00F5FF',
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {/* Shimmer */}
                    <div className="absolute inset-0 shimmer-bg opacity-0 hover:opacity-100 transition-opacity" />

                    {status === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-[#00F5FF] border-t-transparent rounded-full"
                      />
                    ) : status === 'error' ? (
                      <>
                        <AlertCircle size={16} />
                        Failed — Try Again
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
