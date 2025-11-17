import { useState } from 'react'
import { achievementsApi } from '../services/api'
import { Achievement } from '../types'

interface AchievementCardProps {
  achievement: Achievement
  onUpdate: () => void
}

export default function AchievementCard({ achievement, onUpdate }: AchievementCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(achievement.title)
  const [notes, setNotes] = useState(achievement.notes || '')
  const [completed, setCompleted] = useState(achievement.completed)
  const [saving, setSaving] = useState(false)

  const handleToggleComplete = async () => {
    const newCompleted = !completed
    setCompleted(newCompleted)
    try {
      await achievementsApi.update(achievement.id, { completed: newCompleted })
      onUpdate()
    } catch (error) {
      console.error('Failed to update achievement:', error)
      setCompleted(!newCompleted) // Revert on error
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await achievementsApi.update(achievement.id, { title, notes })
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Failed to update achievement:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this achievement?')) return
    try {
      await achievementsApi.delete(achievement.id)
      onUpdate()
    } catch (error) {
      console.error('Failed to delete achievement:', error)
    }
  }

  return (
    <div
      className={`
        glass-dark glass-card p-4 transition-all
        ${completed ? 'opacity-60' : ''}
      `}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Notes (optional)"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setTitle(achievement.title)
                setNotes(achievement.notes || '')
              }}
              className="px-3 py-1 glass-dark hover:bg-white/10 rounded text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleComplete}
            className={`
              mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
              ${completed ? 'bg-blue-600 border-blue-600' : 'border-white/30'}
            `}
          >
            {completed && <span className="text-white text-xs">✓</span>}
          </button>
          <div className="flex-1">
            <h4
              className={`
                font-medium
                ${completed ? 'line-through text-gray-400' : ''}
              `}
            >
              {achievement.title}
            </h4>
            {achievement.notes && (
              <p className="text-sm text-gray-400 mt-1">{achievement.notes}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-400 hover:text-red-400 text-sm"
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

