import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { userApi } from '../services/api'
import { User } from '../types'

interface UserHeaderProps {
  user: User
}

export default function UserHeader({ user }: UserHeaderProps) {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isEditingQuote, setIsEditingQuote] = useState(false)
  const [quote, setQuote] = useState(user.quote || '')
  const [saving, setSaving] = useState(false)

  const handleSaveQuote = async () => {
    setSaving(true)
    try {
      await userApi.updateMe({ quote })
      setIsEditingQuote(false)
      // Refresh user data
      window.location.reload()
    } catch (error) {
      console.error('Failed to update quote:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="glass-dark glass-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Avatar */}
          <img
            src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.display_name}`}
            alt={user.display_name}
            className="w-16 h-16 rounded-full border-2 border-white/20"
          />

          {/* Quote and Name */}
          <div className="flex-1">
            {isEditingQuote ? (
              <div className="space-y-2">
                <textarea
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Your quote..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveQuote}
                    disabled={saving}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingQuote(false)
                      setQuote(user.quote || '')
                    }}
                    className="px-3 py-1 glass-dark hover:bg-white/10 rounded text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {user.quote ? (
                  <p className="text-lg italic mb-2">"{user.quote}"</p>
                ) : (
                  <p className="text-gray-400 italic mb-2">No quote yet. Click to add one.</p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">—</span>
                  <span className="font-medium">{user.display_name}</span>
                  <button
                    onClick={() => setIsEditingQuote(true)}
                    className="ml-2 text-xs text-gray-400 hover:text-gray-300"
                  >
                    ✏️ Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Link */}
        <button
          onClick={() => navigate('/profile')}
          className="px-4 py-2 glass-dark hover:bg-white/10 rounded-lg transition-colors"
        >
          Profile
        </button>
      </div>
    </div>
  )
}

