import { prisma } from "@/db/prisma";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Code, Heart } from "lucide-react";
import CopyButton from "@/components/copy-button";

// Fetch the snippet from the database
async function getSnippet(id: string) {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          }
        }
      }
    });
    
    return snippet;
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  
  // Fetch the snippet data
  const snippet = await getSnippet(id);
  
  // If snippet doesn't exist, show 404 page
  if (!snippet) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link 
            href="/" 
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to snippets
          </Link>
        </div>
        
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 text-white">{snippet.description}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {snippet.user?.image ? (
                  <Image
                    src={snippet.user.image}
                    alt={snippet.user.name || "User"}
                    width={24}
                    height={24}
                    className="rounded-full mr-2 object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center mr-2">
                    <Code className="w-3 h-3 text-gray-400" />
                  </div>
                )}
                <span className="text-sm text-gray-400 mr-4">{snippet.user?.name || "Anonymous"}</span>
              </div>
              
              <span className="text-xs text-gray-500 mr-4">
                {formatDistanceToNow(new Date(snippet.createdAt), { addSuffix: true })}
              </span>
              
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                {snippet.language}
              </span>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 mb-6 overflow-auto">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                <code>{snippet.code}</code>
              </pre>
            </div>
            
            <div className="flex items-center justify-between">
              <button className="flex items-center text-gray-400 hover:text-pink-500 transition-colors">
                <Heart className="w-5 h-5 mr-1" />
                <span>{snippet.likes} likes</span>
              </button>
              
              <CopyButton code={snippet.code} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
