import { PenSquare, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

export default function NoteCard({ note, setNotes }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    setIsDeleting(true);

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id));
      toast.success("Note deleted successfully!");
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
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] group"
    >
      <div className="card-body">
        <h2 className="card-title text-base-content text-lg">{note.title}</h2>
        <p className="text-base-content/70 line-clamp-3 flex-grow">{note.content}</p>
        
        <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-300">
          <span className="text-sm text-base-content/50">
            {new Date(note.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit note"
            >
              <PenSquare className="size-4" />
              Edit
            </button>
            
            <button
              className="btn btn-ghost btn-sm text-error"
              onClick={(e) => handleDelete(e, note._id)}
              disabled={isDeleting}
              aria-label="Delete note"
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}   