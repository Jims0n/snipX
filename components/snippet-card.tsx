import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Code } from "lucide-react";

interface User {
  name: string;
  image: string | null;
}

interface Snippet {
  id: string;
  description: string;
  code: string;
  language: string;
  likes: number;
  createdAt: Date;
  user: User;
}

const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  return (
    <Link href={`/snippet/${snippet.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors h-full flex flex-col">
        <div className="p-4">
          <h2 className="font-medium text-lg mb-2 text-white line-clamp-1">{snippet.description}</h2>
          <div className="bg-gray-900 rounded p-3 mb-3 overflow-hidden h-24">
            <pre className="text-xs text-gray-300 font-mono">
              <code>{snippet.code.length > 150 ? snippet.code.substring(0, 150) + '...' : snippet.code}</code>
            </pre>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-400">{snippet.language}</span>
          </div>
        </div>
        <div className="mt-auto p-4 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between">
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
              <span className="text-sm text-gray-400">{snippet.user?.name || "Anonymous"}</span>
            </div>
            <div className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(snippet.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SnippetCard;