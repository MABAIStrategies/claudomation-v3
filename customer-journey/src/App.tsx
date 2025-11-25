/**
 * Main Application Component
 *
 * Orchestrates the journey experience by rendering the appropriate
 * view based on application state within the BookLayout wrapper.
 */

import { Suspense, lazy, useEffect, useState } from 'react';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { BookLayout } from './components/book/BookLayout';
import { LeadCaptureModal, type LeadData } from './components/modals/LeadCaptureModal';
import { submitLeadToCRM } from './utils/crm';

// Lazy-load pages for better performance
const LandingCover = lazy(() => import('./components/pages/LandingCover'));
const TitleMap = lazy(() => import('./components/pages/TitleMap'));
const ChapterPage = lazy(() => import('./components/pages/ChapterPage'));
const ExecutiveSummaryROI = lazy(() => import('./components/pages/ExecutiveSummaryROI'));
const CheckoutBackCover = lazy(() => import('./components/pages/CheckoutBackCover'));

/**
 * Loading fallback with fantasy styling
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
        <p className="font-serif text-ink-400">Preparing the scroll...</p>
      </div>
    </div>
  );
}

/**
 * View Router Component
 *
 * Renders the appropriate page component based on current view state.
 */
function ViewRouter() {
  const { state } = useJourney();

  // Render appropriate view based on state
  const renderView = () => {
    switch (state.currentView) {
      case 'landing-cover':
        return <LandingCover />;
      case 'title-map':
        return <TitleMap />;
      case 'chapter':
        return <ChapterPage />;
      case 'executive-summary':
        return <ExecutiveSummaryROI />;
      case 'checkout':
        return <CheckoutBackCover />;
      default:
        return <LandingCover />;
    }
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      {renderView()}
    </Suspense>
  );
}

/**
 * Application Shell
 *
 * Wraps the view router with BookLayout for the book aesthetic.
 */
function AppShell() {
  const { state, dispatch, roiCalculation } = useJourney();
  const [showLeadModal, setShowLeadModal] = useState(false);

  // Set document title based on current view
  useEffect(() => {
    const titles: Record<string, string> = {
      'landing-cover': 'Begin Your Journey | MAB AI Strategies',
      'title-map': 'The Realm of Automation | MAB AI Strategies',
      'chapter': 'Automation Discovery | MAB AI Strategies',
      'executive-summary': 'Your ROI Treasure | MAB AI Strategies',
      'checkout': 'Complete Your Quest | MAB AI Strategies',
    };
    document.title = titles[state.currentView] || 'AI Automation Journey';
  }, [state.currentView]);

  // TEMPORARILY DISABLED - Lead capture needs rebuild
  // Trigger lead capture modal after viewing 2+ chapters
  /*
  useEffect(() => {
    if (
      state.chaptersViewed >= 2 &&
      !state.leadCaptured &&
      state.currentView === 'chapter' &&
      !showLeadModal
    ) {
      // Small delay to not interrupt the user immediately
      const timer = setTimeout(() => {
        setShowLeadModal(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.chaptersViewed, state.leadCaptured, state.currentView, showLeadModal]);

  // Track chapter views
  useEffect(() => {
    if (state.currentView === 'chapter') {
      dispatch({ type: 'INCREMENT_CHAPTERS_VIEWED' });
    }
  }, [state.currentChapterIndex, dispatch, state.currentView]);
  */

  const handleLeadSubmit = async (leadData: LeadData) => {
    try {
      // Submit to CRM
      await submitLeadToCRM(
        leadData,
        state.cartLineItems,
        state.roiInputs,
        roiCalculation.estimatedAnnualROI
      );

      // Mark as captured
      dispatch({ type: 'SET_LEAD_CAPTURED', payload: { email: leadData.email } });

      // Update viewer name if provided
      if (leadData.name && leadData.name !== state.viewerName) {
        dispatch({ type: 'SET_VIEWER_NAME', payload: leadData.name });
      }
    } catch (error) {
      console.error('Failed to submit lead:', error);
      throw error;
    }
  };

  // Determine if we show the full book frame
  const showBookFrame = state.currentView !== 'landing-cover' || state.isBookOpen;

  return (
    <>
      <BookLayout showBookFrame={showBookFrame}>
        <ViewRouter />
      </BookLayout>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleLeadSubmit}
        viewerName={state.viewerName}
      />
    </>
  );
}

/**
 * Main App Component
 *
 * Provides the JourneyContext to the entire application.
 */
function App() {
  return (
    <JourneyProvider>
      <AppShell />
    </JourneyProvider>
  );
}

export default App;
