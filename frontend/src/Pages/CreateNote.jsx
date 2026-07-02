import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../lib/axios'

function CreateNote() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content required")
      return
    }

    setLoading(true)
    try {
      await api.post('/notes', { title, content })
      toast.success("Note created successfully")
      navigate('/')
    } catch (error) {
      console.error("Error creating note:", error)
      toast.error("Failed to save note")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-12 group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Title Input */}
          <div className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-5xl font-bold tracking-tight text-slate-900 placeholder:text-slate-300 focus:outline-none transition-colors"
              placeholder="Give your thought a title..."
              autoFocus
            />
            <div className="h-0.5 w-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />
          </div>

          {/* Content Input */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent text-lg text-slate-700 placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed min-h-[400px] transition-colors"
              placeholder="Write your ideas, thoughts, and inspirations here..."
            />
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center pt-8 border-t border-slate-200">
            <span className="text-xs text-slate-400">
              {title.length + content.length} characters
            </span>
            <button
              type="submit"
              disabled={loading || !title.trim() || !content.trim()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:hover:shadow-md"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Publishing...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Save Note
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateNote