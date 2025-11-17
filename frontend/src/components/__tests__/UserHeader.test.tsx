import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserHeader from '../UserHeader'
import { User } from '../../types'

const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  display_name: 'Test User',
  avatar_url: null,
  quote: 'Test quote',
  created_at: '2025-01-01T00:00:00',
  updated_at: '2025-01-01T00:00:00',
}

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

