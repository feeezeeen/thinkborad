import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import NoteCard from '../Components/NoteCard'
import api from '../lib/axios'

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
        setError("Failed to fetch notes. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div>
      <Navbar />
      
      {loading && <div className="text-center p-8">Loading notes...</div>}
      
      {error && <div className="text-red-500 p-4">{error}</div>}
      
      {!loading && notes.length === 0 && !error && (
        <div className="text-center p-8 text-gray-500">No notes found</div>
      )}
      
      {!loading && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-24 py-6">
          {notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage