import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  it('should render the dialog when isOpen is true', () => {
    // Arrange
    render(
      <ConfirmationDialogComponent
        isOpen={true}
        title="Eliminar proyecto"
        labels={{
          closeButton: 'Cancelar',
          acceptButton: 'Eliminar',
        }}
        onAccept={vi.fn()}
        onClose={vi.fn()}
      >
        ¿Seguro que deseas eliminar este proyecto?
      </ConfirmationDialogComponent>
    );

    // Act
    const dialog = screen.getByRole('dialog');

    // Assert
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByText('Eliminar proyecto')
    ).toBeInTheDocument();
    expect(
      screen.getByText('¿Seguro que deseas eliminar este proyecto?')
    ).toBeInTheDocument();
  });

it('should not render the dialog when isOpen is false', () => {
  // Arrange
  render(
    <ConfirmationDialogComponent
      isOpen={false}
      title="Eliminar proyecto"
      labels={{
        closeButton: 'Cancelar',
        acceptButton: 'Eliminar',
      }}
      onAccept={vi.fn()}
      onClose={vi.fn()}
    >
      ¿Seguro que deseas eliminar este proyecto?
    </ConfirmationDialogComponent>
  );

  // Act
  const dialog = screen.queryByRole('dialog');

  // Assert
  expect(dialog).not.toBeInTheDocument();
});

it('should call onClose when clicking Cancel', async () => {
  // Arrange
  const onClose = vi.fn();
  const onAccept = vi.fn();
  const user = userEvent.setup();

  render(
    <ConfirmationDialogComponent
      isOpen={true}
      title="Eliminar proyecto"
      labels={{
        closeButton: 'Cancelar',
        acceptButton: 'Eliminar',
      }}
      onAccept={onAccept}
      onClose={onClose}
    >
      ¿Seguro que deseas eliminar este proyecto?
    </ConfirmationDialogComponent>
  );

  // Act
  await user.click(
    screen.getByRole('button', { name: 'Cancelar' })
  );

  // Assert
  expect(onClose).toHaveBeenCalledOnce();
  expect(onAccept).not.toHaveBeenCalled();
});

it('should call onAccept and onClose when clicking Accept', async () => {
  // Arrange
  const onAccept = vi.fn();
  const onClose = vi.fn();
  const user = userEvent.setup();

  render(
    <ConfirmationDialogComponent
      isOpen={true}
      title="Eliminar proyecto"
      labels={{
        closeButton: 'Cancelar',
        acceptButton: 'Eliminar',
      }}
      onAccept={onAccept}
      onClose={onClose}
    >
      ¿Seguro que deseas eliminar este proyecto?
    </ConfirmationDialogComponent>
  );

  // Act
  await user.click(
    screen.getByRole('button', { name: 'Eliminar' })
  );

  // Assert
  expect(onAccept).toHaveBeenCalledOnce();
  expect(onClose).toHaveBeenCalledOnce();

  expect(
    onAccept.mock.invocationCallOrder[0]
  ).toBeLessThan(
    onClose.mock.invocationCallOrder[0]
  );
});


});
