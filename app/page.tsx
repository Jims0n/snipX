import { prisma } from "@/db/prisma";

import { Code2 } from "lucide-react";
import Link from "next/link";

async function getSnippets() {
  try {
    const snippets = await prisma.snippet.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
    return snippets;
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return [];
  }
}

export default async function Homepage() {
  const snippets = await getSnippets();

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Recent Snippets</h1>
      
      {snippets.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <Code2 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-white mb-2">No snippets yet</h2>
          <p className="text-gray-400 mb-4">Be the first to share a code snippet with the community!</p>
          <p className="text-sm text-gray-500">Click the New Snippet button in the header to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet) => (
            <Link 
              key={snippet.id} 
              href={`/snippet/${snippet.id}`}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors"
            >
              <div className="p-4">
                <h2 className="font-medium text-lg mb-2 text-white">{snippet.description}</h2>
                <div className="bg-gray-900 rounded p-3 mb-3 overflow-hidden h-24">
                  <pre className="text-xs text-gray-300 font-mono">
                    <code>{snippet.code.length > 150 ? snippet.code.substring(0, 150) + '...' : snippet.code}</code>
                  </pre>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-blue-400">{snippet.language}</span>
                 
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    by {snippet.user.name}
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500">{snippet.likes} likes</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}