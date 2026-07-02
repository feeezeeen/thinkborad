import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreateNote from './Pages/CreateNote'
import NoteDetails from './Pages/NoteDetails'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createNote" element={<CreateNote />} />
          <Route path="/note/:id" element={<NoteDetails />} />
          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App