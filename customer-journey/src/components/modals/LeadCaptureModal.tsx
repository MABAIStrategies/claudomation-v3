/**
 * Lead Capture Modal
 *
 * Captures visitor email and additional info for lead generation.
 * Shows after user has engaged with content (viewed 2+ chapters).
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analytics } from '../../utils/analytics';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeadData) => void;
  viewerName?: string;
}

export interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  viewerName = '',
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState<LeadData>({
    name: viewerName,
    email: '',
    company: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Track event
      analytics.submitLeadForm(formData.email);

      // Call parent submit handler
      await onSubmit(formData);

      // Close modal
      onClose();
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error('Lead capture error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LeadData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="pointer-events-auto w-full max-w-md bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg shadow-2xl border-2 border-amber-900/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-amber-800 to-amber-900 px-6 py-4 text-white">
                <h2 className="text-2xl font-bold font-serif">
                  🎯 Unlock Your Custom ROI Report
                </h2>
                <p className="text-amber-100 text-sm mt-1">
                  Get a personalized analysis sent to your inbox
                </p>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-sm font-semibold text-amber-900 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-amber-300 rounded-md focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors bg-white"
                    placeholder="John Smith"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="lead-email"
                    className="block text-sm font-semibold text-amber-900 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-amber-300 rounded-md focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors bg-white"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="lead-company"
                    className="block text-sm font-semibold text-amber-900 mb-1"
                  >
                    Company (Optional)
                  </label>
                  <input
                    id="lead-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-amber-300 rounded-md focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors bg-white"
                    placeholder="Acme Inc."
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block text-sm font-semibold text-amber-900 mb-1"
                  >
                    Phone (Optional)
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-amber-300 rounded-md focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-colors bg-white"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-2 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border-2 border-amber-300 text-amber-900 rounded-md hover:bg-amber-50 transition-colors font-semibold"
                    disabled={isSubmitting}
                  >
                    Maybe Later
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-md hover:from-amber-700 hover:to-amber-800 transition-colors font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Report'}
                  </button>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-amber-700 text-center">
                  We respect your privacy. Your information will only be used to send you the ROI report.
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
