import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID;

// Initialize Google Analytics
export const initializeAnalytics = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== '') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('[Analytics] Google Analytics initialized');
  } else {
    console.log('[Analytics] GA4 Measurement ID not configured');
  }
};

// Track page views
export const trackPageView = (pageName: string) => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== '') {
    ReactGA.send({ hitType: 'pageview', page: pageName, title: pageName });
  }
};

// Track custom events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== '') {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

// Specific event trackers for this app
export const analytics = {
  // User journey events
  viewChapter: (chapterTitle: string) => {
    trackEvent('Chapter', 'View', chapterTitle);
  },

  addToCart: (chapterTitle: string, price: number) => {
    trackEvent('Cart', 'Add Item', chapterTitle, price);
  },

  removeFromCart: (chapterTitle: string) => {
    trackEvent('Cart', 'Remove Item', chapterTitle);
  },

  selectPackage: (packageTier: string, price: number) => {
    trackEvent('Package', 'Select', packageTier, price);
  },

  updateROIInput: (sliderName: string, value: number) => {
    trackEvent('ROI', 'Update Input', sliderName, value);
  },

  viewROISummary: (totalROI: number) => {
    trackEvent('ROI', 'View Summary', 'Total ROI', totalROI);
  },

  startCheckout: (cartTotal: number) => {
    trackEvent('Checkout', 'Start', 'Cart Total', cartTotal);
  },

  completeCheckout: (cartTotal: number) => {
    trackEvent('Checkout', 'Complete', 'Order Total', cartTotal);
  },

  shareLinkGenerated: () => {
    trackEvent('Share', 'Generate Link');
  },

  exportPDF: (pageName: string) => {
    trackEvent('Export', 'PDF', pageName);
  },

  openSuggestions: (chapterTitle: string) => {
    trackEvent('Suggestions', 'Open', chapterTitle);
  },

  submitLeadForm: (email: string) => {
    trackEvent('Lead', 'Submit', email);
  },
};
