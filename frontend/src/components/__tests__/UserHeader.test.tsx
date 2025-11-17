import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserHeader from '../UserHeader'
import { User } from '../../types'

const mockNavigate = vi.fn()
const mockLogout = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    logout: mockLogout,
  }),
}))

const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  display_name: 'Test User',
  avatar_url: null,
  quote: 'Test quote',
  created_at: '2025-01-01T00:00:00',
  updated_at: '2025-01-01T00:00:00',
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('UserHeader', () => {
  it('renders user information', () => {
    render(<UserHeader user={mockUser} />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('"Test quote"')).toBeInTheDocument()
  })

  it('renders edit button', () => {
    render(<UserHeader user={mockUser} />)
    expect(screen.getByText(/Edit/i)).toBeInTheDocument()
  })
})

