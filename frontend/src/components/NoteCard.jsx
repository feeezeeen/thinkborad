import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function NoteCard({ note, setNotes }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Delete this note?")) return;

    setIsDeleting(true);

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id));
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200 flex flex-col min-h-[220px]"
    >
      {/* Gradient Accent Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Background Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content Area */}
      <div className="flex-grow relative z-10">
        <h2 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
          {note.title || "Untitled"}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {note.content || "No content"}
        </p>
      </div>
      
      {/* Divider */}
      <div className="h-px w-full bg-slate-100 my-4 relative z-10" />
      
      {/* Footer Area */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-xs font-medium text-slate-400">
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        
        {/* Delete Button */}
        <button
          onClick={(e) => handleDelete(e, note._id)}
          disabled={isDeleting}
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50"
          aria-label="Delete note"
        >
          {isDeleting ? (
            <div className="size-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 className="size-4 stroke-[2]" />
          )}
        </button>
      </div>
    </Link>
  );
}