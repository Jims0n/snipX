import { Button } from "./ui/button";
import { XIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { useState } from "react";

const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
]

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
    <div className="max-w-2xl mx-auto bg-gray-800 p-4 rounded-lg border border-gray-700" onClick={handleFormClick}>
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">Create New Snippet</h2>
        <Button onClick={onCancel} variant="outline" size="icon">
            <XIcon className="w-4 h-4" />
        </Button>
       </div>
       <form onSubmit={handleSubmit}>
       <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
        <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="What's this snippet about?"
        className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none resize-none"
        rows={3}
        />
       </div>
       <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">Code</label>
        <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        className="w-full bg-gray-700 text-white rounded-lg p-3 outline-none resize-none font-mono"
        rows={10}
        />
       </div>
       <div className="flex items-center mb-4" onClick={(e) => e.stopPropagation()}>
       <label className="mr-2 text-gray-300">Language:</label>
       <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
            {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                    {lang}
                </SelectItem>
            ))}
        </SelectContent>
       </Select>
       </div>
       <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sharing..." : "Share"}
        </Button>
       </div>
       </form>
    </div> 
    );
}
 
export default NewSnippetForm;