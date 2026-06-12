import { useEffect, useState } from "react";
import { ChevronLeft, Save, Trash2 } from "lucide-react";
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
        const message = "Failed to fetch note";
        toast.error(message);
        setError(message);
        console.error("Error fetching notes", error);
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
    if (!hasChanges) {
      toast.success("No changes to save");
      return;
    }

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
      toast.success("Note saved successfully");
    } catch (error) {
      toast.error("Failed to save note");
      console.error("Error saving note", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this note? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete note");
        console.error("Error deleting note", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost mt-4 gap-2"
        >
          <ChevronLeft className="size-4" />
          Go Back
        </button>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="p-6">
        <div className="alert alert-warning">
          <span>Note not found</span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost mt-4 gap-2"
        >
          <ChevronLeft className="size-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="btn btn-ghost btn-sm gap-2"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
          {hasChanges && (
            <span className="badge badge-warning gap-1">
              <span className="size-2 bg-warning rounded-full animate-pulse"></span>
              Unsaved Changes
            </span>
          )}
        </div>

        {/* Note Card */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            {/* Title Input */}
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="input input-bordered input-lg font-bold text-2xl w-full mb-2 focus:input-primary"
              placeholder="Note title"
            />

            <div className="divider my-2"></div>

            {/* Metadata */}
            <p className="text-sm text-base-content/60 mb-4">
              Created: {new Date(note.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            {/* Content Textarea */}
            <textarea
              value={editedContent}
              onChange={handleContentChange}
              placeholder="Write your note here..."
              className="textarea textarea-bordered focus:textarea-primary w-full h-64 resize-none focus:outline-none"
            />

            <div className="divider my-4"></div>

            {/* Action Buttons */}
            <div className="card-actions justify-between">
              <button
                onClick={handleDelete}
                className="btn btn-error btn-outline gap-2"
              >
                <Trash2 className="size-4" />
                Delete
              </button>

              <button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="btn btn-primary gap-2"
              >
                {saving ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteDetails;