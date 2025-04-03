import { Button } from "./ui/button";
import { XIcon, Code, FileCode, Hash } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { useState } from "react";

const languages = [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Go",
    "Rust",
    "PHP",
    "Swift",
    "Kotlin",
    "C#",
    "SQL"
];

interface NewSnippetFormProps {
    onSubmit: (data: { description: string; code: string; language: string }) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const NewSnippetForm = ({ onSubmit, onCancel, isLoading = false }: NewSnippetFormProps) => {
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("JavaScript");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!description || !code || !language) {
            alert("Please fill in all fields");
            return;
        }
        try {
            await onSubmit({ description, code, language });
            setDescription("");
            setCode("");
            setLanguage("JavaScript");
        } catch (error) {
            console.error("Error submitting snippet:", error);
        }
    }

    // Prevent modal from closing when interacting with the form
    const handleFormClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };
    
    return ( 
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-hidden" onClick={handleFormClick}>
       <div className="flex justify-between items-center p-5 border-b border-gray-700 bg-gray-750">
        <div className="flex items-center">
            <FileCode className="w-5 h-5 text-blue-400 mr-2" />
            <h2 className="text-xl font-semibold text-white">Create New Snippet</h2>
        </div>
        <Button onClick={onCancel} variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
            <XIcon className="w-5 h-5" />
        </Button>
       </div>
       
       <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Hash className="w-4 h-4 mr-2 text-gray-400" />
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this snippet about?"
                className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none resize-none border border-gray-600 focus:border-blue-500 transition-colors"
                rows={2}
              />
            </div>
            
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Code className="w-4 h-4 mr-2 text-gray-400" />
                Code
              </label>
              <div className="relative">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="// Paste or type your code here..."
                  className="w-full bg-gray-700 text-white rounded-lg p-4 outline-none resize-none font-mono border border-gray-600 focus:border-blue-500 transition-colors"
                  rows={12}
                />
              </div>
            </div>
            
            <div onClick={(e) => e.stopPropagation()} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <label className="text-gray-300 mr-2 text-sm font-medium">Language:</label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[280px]">
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel} 
                  className="border-gray-600 hover:bg-gray-700 text-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? "Sharing..." : "Share Snippet"}
                </Button>
              </div>
            </div>
          </div>
       </form>
    </div> 
    );
}
 
export default NewSnippetForm;