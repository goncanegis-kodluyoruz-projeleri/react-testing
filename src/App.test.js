import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('App testleri', () => {
  let inputElement, headerElement, resultsElement, hundredElement

  beforeEach(() => {
    render(<App />)
    inputElement = screen.getByAltText('input')
    headerElement = screen.getByText(/emoji search/i)
    resultsElement = screen.getByTestId('results-list')
    hundredElement = screen.getByAltText('100')
  })

  test('renders header', () => {
    expect(headerElement).toBeInTheDocument()
  })

  test('renders emoji list', () => {
    expect(resultsElement).toBeInTheDocument()
  })

  test('allows users to type into input field', () => {
    // Simulate user events
    fireEvent.change(inputElement, { target: { value: 'Smile' } })

    // Make assertion
    expect(inputElement.value).toBe('Smile')
  })

  test('renders correct results on search', () => {
    // Simulate user events
    fireEvent.change(inputElement, { target: { value: 'Smile' } })

    // Make assertion
    expect(resultsElement).toHaveTextContent('Smile')
  })

  test('copies to clipboard when clicked', () => {
    // Simulate user events
    userEvent.click(hundredElement)
    userEvent.paste(inputElement, '100')
    // Make assertion
    expect(inputElement).toHaveValue('100')
  })
})
