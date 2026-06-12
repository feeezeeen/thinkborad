import { Link } from "react-router-dom"
import { PlusIcon } from "lucide-react"


function Navbar() {
  return (
    <header className="navbar bg-base-300 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-6xl w-full px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="text-3xl font-bold text-primary font-mono tracking-tighter hover:opacity-80 transition-opacity">
            THINKBOARD
          </Link>
          <Link to="/createNote" className="btn btn-primary">
            <PlusIcon className="h-6 w-6" />
            <span>Create Note</span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar