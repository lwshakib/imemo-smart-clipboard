import { useState } from 'react'
import Navbar, { TabId } from './components/Navbar'
import HistoryView from './components/HistoryView'
import StarredView from './components/StarredView'
import SearchView from './components/SearchView'
import SettingsView from './components/SettingsView'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('history')

  const renderView = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryView />
      case 'starred':
        return <StarredView />
      case 'search':
        return <SearchView />
      case 'settings':
        return <SettingsView />
      default:
        return <HistoryView />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto no-drag">
        <div className="mx-auto h-full max-w-lg">
          {renderView()}
        </div>
      </main>
      
      {/* Subtle overlay/gradient at the bottom for smooth scroll fading */}
      <div className="pointer-events-none fixed bottom-0 left-0 h-12 w-full bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
    </div>
  )
}

export default App
