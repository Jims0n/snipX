'use client';

import { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded transition-colors flex items-center"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <ClipboardCopy className="w-4 h-4 mr-1" />
          <span>Copy code</span>
        </>
      )}
    </button>
  );
} 