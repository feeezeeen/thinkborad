import { useEffect, useState } from "react";
import { ChevronLeft, Save, Trash2, Calendar, AlertCircle } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function NoteDetails() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setError(null);
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setEditedTitle(res.data.title || "");
        setEditedContent(res.data.content || "");
        setHasChanges(false);
      } catch (error) {
        const message = "Could not load this note";
        toast.error(message,error);
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
    setHasChanges(true);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      setSaving(true);
      await api.put(`/notes/${id}`, {
        title: editedTitle,
        content: editedContent,
      });
      setNote({
        ...note,
        title: editedTitle,
        content: editedContent,
      });
      setHasChanges(false);
      toast.success("Changes saved");
    } catch (error) {
      toast.error("Failed to save changes",error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this note permanently?")) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete note",error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-cyan-500 mb-4"></span>
          <p className="text-slate-500 text-sm mt-2">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center size-12 bg-red-100 rounded-full mb-4">
            <AlertCircle className="size-6 text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Note Not Found</h2>
          <p className="text-slate-600 mb-6">{error || "This note doesn't exist"}</p>
          <button 
            onClick={() => navigate("/")} 
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="size-4" />
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors group"
          >
            <ChevronLeft className="size-4 group-hover:-translate-x-0.5 transition-transform" />
            Notes
          </button>
          
          {hasChanges && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200 text-xs font-medium">
              <div className="size-2 bg-amber-500 rounded-full animate-pulse" />
              Unsaved changes
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="space-y-8">
          {/* Title Input */}
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="w-full bg-transparent text-5xl font-bold tracking-tight text-slate-900 focus:outline-none placeholder:text-slate-300 transition-colors"
              placeholder="Untitled"
            />
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <Calendar className="size-4" />
            <span className="font-medium">
              {new Date(note.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="h-px bg-gradient-to-r from-slate-200 via-slate-200 to-transparent" />

          {/* Content Textarea */}
          <textarea
            value={editedContent}
            onChange={handleContentChange}
            placeholder="Your thoughts here..."
            className="w-full bg-transparent text-lg text-slate-700 focus:outline-none resize-none leading-relaxed min-h-[450px] placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* Footer Action Bar */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-red-600 transition-colors p-2 -ml-2 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="size-4" />
            Delete
          </button>

          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-sm"
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Save Changes
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default NoteDetails;