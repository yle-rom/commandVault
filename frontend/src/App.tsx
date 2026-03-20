import { useState, useEffect } from 'react'
import type { Command } from '../../backend/src/types'

function App() {
  const [commands, setCommands] = useState<Command[]>([])
  const [search, setSearch] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/commands')
      .then(res => res.json())
      .then(data => setCommands(data.commands))
  }, [])

  const filtered = commands.filter(command =>
    command.name.toLowerCase().includes(search.toLowerCase()) ||
    command.description.toLowerCase().includes(search.toLowerCase()) ||
    command.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopied(cmd)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Command Vault</h1>
      <input
        type="text"
        placeholder="Search commands, descriptions, tags..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-gray-800 text-gray-100 rounded-lg p-3 mb-8 outline-none border border-gray-700 focus:border-blue-500"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(command => (
          <div key={command.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{command.name}</h2>
              <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {command.category}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{command.description}</p>
            <div className="flex flex-col gap-2">
              {command.usefulCommands.map((uc, index) => (
                <div key={index} className="bg-gray-900 rounded p-2 flex justify-between items-start gap-2">
                  <div>
                    <code className="text-green-400 text-sm">{uc.cmd}</code>
                    <p className="text-gray-500 text-xs mt-1">{uc.note}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(uc.cmd)}
                    className="text-xs bg-gray-700 hover:bg-blue-600 text-gray-300 px-2 py-1 rounded shrink-0 transition-colors"
                  >
                    {copied === uc.cmd ? 'copied!' : 'copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
