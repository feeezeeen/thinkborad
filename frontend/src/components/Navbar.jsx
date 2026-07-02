import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          ThinkBoard
        </Link>
        
        {/* Create Note Button */}
        <Link 
          to="/createNote" 
          className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New Note</span>
        </Link>
        
      </div>
    </header>
  )
}

export default Navbar