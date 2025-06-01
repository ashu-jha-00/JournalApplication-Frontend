import React from "react";

function ErrorScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-700">
      <h1 className="text-5xl font-bold mb-4">OOPS</h1>
      <p className="text-lg">Server may not be running</p>
    </div>
  );
}

export default ErrorScreen;
