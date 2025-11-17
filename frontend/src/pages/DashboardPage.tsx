import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import UserHeader from '../components/UserHeader'
import Calendar from '../components/Calendar'
import DayView from '../components/DayView'
import { daysApi } from '../services/api'
import { DayView as DayViewType } from '../types'

export default function DashboardPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [dayData, setDayData] = useState<DayViewType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDayData()
  }, [selectedDate])

  const fetchDayData = async () => {
    setLoading(true)
    try {
      const dateStr = format(selectedDate, 'yyyy-MM-dd')
      const response = await daysApi.getDay(dateStr)
      setDayData(response.data)
    } catch (error) {
      console.error('Failed to fetch day data:', error)
    } finally {
      setLoading(false)
    }
  }

  const isToday = format(selectedDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="mb-6">
          <UserHeader user={user!} />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Calendar */}
          <div className="lg:col-span-1">
            <Calendar
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>

          {/* Main Content - Day View */}
          <div className="lg:col-span-3">
            <div className="glass-dark glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {format(selectedDate, 'dd/MM/yy')} — {format(selectedDate, 'EEEE')}
                  </h2>
                  {isToday && (
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                      Today
                    </span>
                  )}
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 glass-dark rounded-lg hover:bg-white/10 transition-colors"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-400">Loading...</div>
              ) : (
                <DayView
                  date={selectedDate}
                  dayData={dayData}
                  onUpdate={fetchDayData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

