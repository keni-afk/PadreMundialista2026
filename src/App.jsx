import { useState } from 'react'
import Home from './pages/Home'
import Roulette from './pages/Roulette'
import Flags from './pages/Flags'
import Quiz from './pages/Quiz'

const PAGES = {
  home: Home,
  roulette: Roulette,
  flags: Flags,
  quiz: Quiz,
}

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (target) => {
    setPage(target)
    window.scrollTo({ top: 0 })
  }

  const PageComponent = PAGES[page] || Home

  return (
    <div className="min-h-screen stadium-bg">
      <PageComponent
        onNavigate={navigate}
        onBack={() => navigate('home')}
      />
    </div>
  )
}
