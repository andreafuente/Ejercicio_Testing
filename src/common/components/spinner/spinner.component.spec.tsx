
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('SpinnerComponent', () => {
  it('should display spinner when promise is in progress', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: true,
    });

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
  it('should not display spinner when no promise is in progress', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: false,
    });

    // Act
    render(<SpinnerComponent />);

    // Assert
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

it('should not display spinner when no promise is in progress', () => {
  // Arrange
  vi.mocked(usePromiseTracker).mockReturnValue({
    promiseInProgress: false,
  });

  // Act
  render(<SpinnerComponent />);

  // Assert
  expect(
    screen.queryByRole('presentation')
  ).not.toBeInTheDocument();
});

});
