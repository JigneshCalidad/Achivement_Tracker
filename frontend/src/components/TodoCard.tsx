import { useState } from 'react'
import { todosApi } from '../services/api'
import { Todo } from '../types'

interface TodoCardProps {
  todo: Todo
  onUpdate: () => void
}

const priorityColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
}

export default function TodoCard({ todo, onUpdate }: TodoCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [notes, setNotes] = useState(todo.notes || '')
  const [completed, setCompleted] = useState(todo.completed)
  const [priority, setPriority] = useState(todo.priority)
  const [saving, setSaving] = useState(false)

  const handleToggleComplete = async () => {
    const newCompleted = !completed
    setCompleted(newCompleted)
    try {
      await todosApi.update(todo.id, { completed: newCompleted })
      onUpdate()
    } catch (error) {
      console.error('Failed to update todo:', error)
      setCompleted(!newCompleted)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await todosApi.update(todo.id, { title, notes, priority })
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Failed to update todo:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this todo?')) return
    try {
      await todosApi.delete(todo.id)
      onUpdate()
    } catch (error) {
      console.error('Failed to delete todo:', error)
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
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
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
                setTitle(todo.title)
                setNotes(todo.notes || '')
                setPriority(todo.priority)
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
            <div className="flex items-center gap-2">
              <h4
                className={`
                  font-medium
                  ${completed ? 'line-through text-gray-400' : ''}
                `}
              >
                {todo.title}
              </h4>
              <span className={`text-xs font-medium ${priorityColors[priority]}`}>
                {todo.priority}
              </span>
              {todo.due_time && (
                <span className="text-xs text-gray-400">⏰ {todo.due_time}</span>
              )}
            </div>
            {todo.notes && (
              <p className="text-sm text-gray-400 mt-1">{todo.notes}</p>
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

