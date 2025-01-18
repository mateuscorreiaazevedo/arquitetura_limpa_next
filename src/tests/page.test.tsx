import HomePage from '@/app/(app)/page'
import { render, screen } from '@testing-library/react'

describe('HomePage', () => {
  it('should Header is render the page', () => {
    render(<HomePage />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
