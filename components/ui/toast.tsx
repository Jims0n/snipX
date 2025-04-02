import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface ToastProps {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  visible: boolean;
  onClose: () => void;
}

export function Toast({
  title,
  description,
  variant = "default",
  visible,
  onClose,
}: ToastProps) {
  React.useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);
  
  if (!visible) return null;
  
  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center justify-between w-full max-w-md gap-2 p-4 rounded-lg shadow-lg",
        variant === "default" 
          ? "bg-green-500 text-white" 
          : "bg-red-500 text-white"
      )}
    >
      <div className="flex flex-col space-y-1">
        {title && <h4 className="font-medium">{title}</h4>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      <button 
        onClick={onClose}
        className="rounded-full p-1 hover:bg-black/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
} 