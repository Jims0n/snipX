import Link from "next/link";
import { FileX2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <FileX2 className="w-16 h-16 text-gray-500 mx-auto mb-6" />
        <h2 className="text-2xl font-medium text-white mb-2">Snippet not found</h2>
        <p className="text-gray-400 mb-6">
          The snippet you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
} 