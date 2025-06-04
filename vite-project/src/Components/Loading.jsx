import React from 'react';

function Loading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-neutral-50 bg-opacity-95 backdrop-blur-sm z-50" style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <div className="flex items-center justify-center relative" style={{ maxWidth: '300px', maxHeight: '300px' }}>
        <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary"></div>
        <div className="absolute animate-spin rounded-full h-20 w-20 border-t-4 border-secondary" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        <div className="h-16 w-16 rounded-full flex items-center justify-center bg-neutral-50 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-md text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ maxWidth: '24px', maxHeight: '24px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      <p className="mt-6 body-md text-gradient font-semibold">Loading your journal...</p>
    </div>
  );
}

export default Loading;