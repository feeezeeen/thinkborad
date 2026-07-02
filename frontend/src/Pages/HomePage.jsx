import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import NoteCard from '../Components/NoteCard'
import api from '../lib/axios'
import { BookOpen, Zap } from 'lucide-react'

function HomePage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const response = await api.get('/notes')
        setNotes(response.data)
        setError(null)
      } catch (error) {
        console.error("Error fetching notes:", error)
        setError("Failed to load notes")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        {!loading && notes.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="size-5 text-cyan-500" />
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Your Notes</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900">
              {notes.length} thought{notes.length !== 1 ? 's' : ''} captured
            </h1>
            <p className="text-slate-600 mt-2">Organize and explore your ideas</p>
          </div>
        )}
        
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="inline-flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-lg text-cyan-500"></span>
              <p className="text-sm text-slate-500 font-medium">Loading your notes...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && !loading && (
          <div className="max-w-md mx-auto p-6 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 font-medium text-center">{error}</p>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && notes.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center max-w-md">
              <div className="inline-flex items-center justify-center size-16 bg-cyan-100 rounded-full mb-6">
                <BookOpen className="size-8 text-cyan-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">No notes yet</h2>
              <p className="text-slate-600 mb-8">Start capturing your thoughts and ideas</p>
            </div>
          </div>
        )}
        
        {/* Notes Grid */}
        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage