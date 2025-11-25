/**
 * CRM Integration Utilities
 *
 * Sends lead data to CRM webhook endpoints (Zapier, Make.com, etc.)
 */

import type { LeadData } from '../components/modals/LeadCaptureModal';
import type { ROIInputs, CartLineItem } from '../types';

const WEBHOOK_URL = import.meta.env.VITE_CRM_WEBHOOK_URL;

interface LeadSubmission {
  lead: LeadData;
  context: {
    timestamp: string;
    pageUrl: string;
    cartItems: Array<{
      chapterId: string;
      chapterTitle: string;
      costUSD: number;
    }>;
    roiInputs: ROIInputs;
    estimatedROI?: number;
  };
}

/**
 * Submit lead data to CRM webhook
 */
export const submitLeadToCRM = async (
  leadData: LeadData,
  cartItems: CartLineItem[],
  roiInputs: ROIInputs,
  estimatedROI?: number
): Promise<void> => {
  if (!WEBHOOK_URL || WEBHOOK_URL === '') {
    console.log('[CRM] Webhook URL not configured. Lead data:', leadData);
    return;
  }

  const submission: LeadSubmission = {
    lead: leadData,
    context: {
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      cartItems: cartItems.map(item => ({
        chapterId: item.chapterId,
        chapterTitle: item.chapterTitle,
        costUSD: item.costUSD,
      })),
      roiInputs,
      estimatedROI,
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    console.log('[CRM] Lead submitted successfully');
  } catch (error) {
    console.error('[CRM] Failed to submit lead:', error);
    throw error;
  }
};

/**
 * Submit checkout completion to CRM
 */
export const submitCheckoutToCRM = async (
  leadData: LeadData,
  cartItems: CartLineItem[],
  totalCost: number,
  paymentMethod?: string
): Promise<void> => {
  if (!WEBHOOK_URL || WEBHOOK_URL === '') {
    console.log('[CRM] Webhook URL not configured. Checkout data:', {
      leadData,
      totalCost,
    });
    return;
  }

  const checkoutData = {
    type: 'checkout',
    lead: leadData,
    order: {
      timestamp: new Date().toISOString(),
      totalCost,
      items: cartItems.map(item => ({
        chapterId: item.chapterId,
        chapterTitle: item.chapterTitle,
        costUSD: item.costUSD,
      })),
      paymentMethod,
    },
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}`);
    }

    console.log('[CRM] Checkout submitted successfully');
  } catch (error) {
    console.error('[CRM] Failed to submit checkout:', error);
    throw error;
  }
};
