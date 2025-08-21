import React from 'react';

const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-sidebar bg-opacity-75 dark:bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  );
};

export default FullScreenLoader;
