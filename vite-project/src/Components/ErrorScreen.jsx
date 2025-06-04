import React from "react";

function ErrorScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
      <div className="card card-glass p-10 max-w-md w-full text-center">
        <div className="rounded-full bg-error bg-opacity-10 w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon-md text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="heading-md mb-4 text-error">Connection Error</h1>
        <p className="body-md text-neutral-600 mb-4">
          Unable to connect to the server. Please check your connection or try
          again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary mx-auto"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorScreen;
