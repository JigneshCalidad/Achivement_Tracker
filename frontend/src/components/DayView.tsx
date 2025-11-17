import { useState } from 'react'
import { format } from 'date-fns'
import AchievementCard from './AchievementCard'
import TodoCard from './TodoCard'
import { achievementsApi, todosApi } from '../services/api'
import { DayView as DayViewType } from '../types'

interface DayViewProps {
  date: Date
  dayData: DayViewType | null
  onUpdate: () => void
}

export default function DayView({ date, dayData, onUpdate }: DayViewProps) {
  const [newAchievement, setNewAchievement] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [addingAchievement, setAddingAchievement] = useState(false)
  const [addingTodo, setAddingTodo] = useState(false)

  const handleAddAchievement = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTitle = newAchievement.trim()
    if (!trimmedTitle) return

    setAddingAchievement(true)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      await achievementsApi.create(dateStr, { title: trimmedTitle })
      setNewAchievement('')
      await onUpdate()
    } catch (error: any) {
      console.error('Failed to create achievement:', error)
      alert(error.response?.data?.detail || 'Failed to add achievement. Please try again.')
    } finally {
      setAddingAchievement(false)
    }
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedTitle = newTodo.trim()
    if (!trimmedTitle) return

    setAddingTodo(true)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      await todosApi.create(dateStr, { title: trimmedTitle })
      setNewTodo('')
      await onUpdate()
    } catch (error: any) {
      console.error('Failed to create todo:', error)
      alert(error.response?.data?.detail || 'Failed to add todo. Please try again.')
    } finally {
      setAddingTodo(false)
    }
  }

  const achievements = dayData?.achievements || []
  const todos = dayData?.todos || []

  const completedAchievements = achievements.filter((a) => a.completed).length
  const completedTodos = todos.filter((t) => t.completed).length

  return (
    <div className="space-y-6">
      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            Achievements
            {achievements.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({completedAchievements}/{achievements.length})
              </span>
            )}
          </h3>
        </div>

        <form onSubmit={handleAddAchievement} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add today's achievement..."
              className="flex-1 px-4 py-2 bg-white/20 dark:bg-white/5 border-2 border-gray-400 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400"
              disabled={addingAchievement}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={addingAchievement || !newAchievement.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              {addingAchievement ? '...' : '+'}
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {achievements.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="mb-2">No achievements yet</p>
              <p className="text-sm">Start tracking your wins!</p>
            </div>
          ) : (
            achievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onUpdate={onUpdate}
              />
            ))
          )}
        </div>
      </div>

      {/* Todos Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            Todos
            {todos.length > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({completedTodos}/{todos.length})
              </span>
            )}
          </h3>
        </div>

        <form onSubmit={handleAddTodo} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add todo..."
              className="flex-1 px-4 py-2 bg-white/20 dark:bg-white/5 border-2 border-gray-400 dark:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400"
              disabled={addingTodo}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={addingTodo || !newTodo.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
            >
              {addingTodo ? '...' : '+'}
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="mb-2">No todos yet</p>
              <p className="text-sm">Add your first task!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoCard key={todo.id} todo={todo} onUpdate={onUpdate} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

