import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-blue-500">Loading...</p>
    </div>
  );
}

export default Loading;