import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

// Prilagodite import stvarnom putu do komponente
// npr. '../../src/components/DynButton'
const DynButton: React.FC<{ label?: string; onClick?: () => void }> = ({ label = 'Button', onClick }) => (
  <button onClick={onClick} aria-label={label}>{label}</button>
)

describe('DynButton (sample)', () => {
  it('renderuje label i hvata klik', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<DynButton label="Save" onClick={onClick} />)

    const btn = screen.getByRole('button', { name: /save/i })
    expect(btn).toBeInTheDocument()

    await user.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
