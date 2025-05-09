import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">I'm coding this thing like</h1>
      <p className="text-xl text-gray-600 mb-8">i dont even know how you want this to look </p>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">so i'm keep this extremely basic</h2>
        <p className="text-gray-600 mb-6">so tell me how you want it .</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
          <Link 
            href="/signup"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block transition duration-300 ease-in-out"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}