/**
 * URL Parameter Utilities
 *
 * Handles encoding/decoding of app state to/from URL parameters
 * for sharing and deep linking functionality.
 */

import type { CartLineItem, ROIInputs } from '../types';

interface URLState {
  name?: string;
  cartItems?: string[];
  roiInputs?: Partial<ROIInputs>;
  currentPage?: number;
}

/**
 * Parse URL parameters and extract app state
 */
export const parseURLParams = (): URLState => {
  const params = new URLSearchParams(window.location.search);

  const state: URLState = {};

  // Parse name
  const name = params.get('name');
  if (name) state.name = decodeURIComponent(name);

  // Parse cart items (comma-separated chapter IDs)
  const cart = params.get('cart');
  if (cart) {
    state.cartItems = cart.split(',').filter(Boolean);
  }

  // Parse ROI inputs
  const avgCost = params.get('avgCost');
  const hoursSaved = params.get('hoursSaved');
  const uptake = params.get('uptake');

  if (avgCost || hoursSaved || uptake) {
    state.roiInputs = {};
    if (avgCost) state.roiInputs.avgHourlyCost = parseFloat(avgCost);
    if (hoursSaved) state.roiInputs.hoursSavedPerWeek = parseFloat(hoursSaved);
    if (uptake) state.roiInputs.automationUptakeRate = parseFloat(uptake);
  }

  // Parse current page
  const page = params.get('page');
  if (page) state.currentPage = parseInt(page, 10);

  return state;
};

/**
 * Generate a shareable URL with current app state
 */
export const generateShareURL = (
  name: string,
  cartItems: CartLineItem[],
  roiInputs: ROIInputs,
  currentPage?: number
): string => {
  const baseURL = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();

  // Add name
  if (name && name.trim()) {
    params.set('name', encodeURIComponent(name.trim()));
  }

  // Add cart items (chapter IDs only)
  if (cartItems.length > 0) {
    const chapterIds = cartItems.map(item => item.chapterId).join(',');
    params.set('cart', chapterIds);
  }

  // Add ROI inputs (only if they differ from defaults)
  if (roiInputs.avgHourlyCost !== 65) {
    params.set('avgCost', roiInputs.avgHourlyCost.toString());
  }
  if (roiInputs.hoursSavedPerWeek !== 20) {
    params.set('hoursSaved', roiInputs.hoursSavedPerWeek.toString());
  }
  if (roiInputs.automationUptakeRate !== 70) {
    params.set('uptake', roiInputs.automationUptakeRate.toString());
  }

  // Add current page
  if (currentPage !== undefined && currentPage > 0) {
    params.set('page', currentPage.toString());
  }

  const queryString = params.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (fallbackErr) {
      console.error('Failed to copy to clipboard', fallbackErr);
      return false;
    }
  }
};

/**
 * Update URL without page reload
 */
export const updateURL = (
  name: string,
  cartItems: CartLineItem[],
  roiInputs: ROIInputs,
  currentPage?: number
): void => {
  const newURL = generateShareURL(name, cartItems, roiInputs, currentPage);
  window.history.replaceState({}, '', newURL);
};
