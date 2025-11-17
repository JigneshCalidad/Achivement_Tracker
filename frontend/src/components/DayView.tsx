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
    if (!newAchievement.trim()) return

    setAddingAchievement(true)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      await achievementsApi.create(dateStr, { title: newAchievement.trim() })
      setNewAchievement('')
      onUpdate()
    } catch (error) {
      console.error('Failed to create achievement:', error)
    } finally {
      setAddingAchievement(false)
    }
  }

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    setAddingTodo(true)
    try {
      const dateStr = format(date, 'yyyy-MM-dd')
      await todosApi.create(dateStr, { title: newTodo.trim() })
      setNewTodo('')
      onUpdate()
    } catch (error) {
      console.error('Failed to create todo:', error)
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
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="Add today's achievement..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={addingAchievement}
          />
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
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add todo..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={addingTodo}
          />
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

