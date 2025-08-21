
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function NotFound() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-black dark:to-sidebar text-gray-900 dark:text-gray-100 p-4">
      <div className="bg-white dark:bg-sidebar rounded-lg shadow-xl p-8 md:p-12 text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        <h1 className="text-8xl md:text-9xl font-extrabold text-primary mb-4 animate-bounce-slow">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mb-4">Oops! Page Not Found</p>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          It looks like you've stumbled upon a page that doesn't exist.
        </p>
        <Link href={isAuthenticated ? '/dashboard' : '/login'}>
          <button className="inline-flex items-center cursor-pointer px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200">
            {isAuthenticated ? 'Go to Dashboard' : 'Go to Login'}
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
