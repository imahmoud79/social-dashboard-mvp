import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AMG-CHA
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Social Dashboard
          </h2>
          <p className="text-gray-600">
            Analytics and campaign management for social media platforms
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="block w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-4 rounded-md transition-colors"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Demo Features:</strong> YouTube live integration, Facebook/Instagram/TikTok/X stubs, 
            real-time charts, ROI tracking, and pluggable connector architecture.
          </p>
        </div>
      </div>
    </div>
  );
}
