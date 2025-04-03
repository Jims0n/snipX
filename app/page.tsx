import SnippetCard from "@/components/snippet-card";
import { prisma } from "@/db/prisma";
import { Code2 } from "lucide-react";

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet) => (
            <SnippetCard 
              key={snippet.id} 
              snippet={snippet} 
            />
          ))}
        </div>
      )}
    </main>
  );
}