
import { describe, it, expect } from 'vitest';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog', () => {
  it('should initialize with dialog closed and empty item', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);

    expect(result.current.itemToDelete).toEqual({
      id: '',
      name: '',
    });
  });

it('should open dialog and set selected item', () => {
  // Arrange
  const { result } = renderHook(() => useConfirmationDialog());

  const selectedItem = {
    id: '1',
    name: 'Proyecto de prueba',
  };

  // Act
  act(() => {
    result.current.onOpenDialog(selectedItem);
  });

  // Assert
  expect(result.current.isOpen).toBe(true);
  expect(result.current.itemToDelete).toEqual(selectedItem);
});

it('should close dialog without clearing selected item', () => {
  // Arrange
  const { result } = renderHook(() => useConfirmationDialog());

  const selectedItem = {
    id: '1',
    name: 'Proyecto de prueba',
  };

  act(() => {
    result.current.onOpenDialog(selectedItem);
  });

  // Act
  act(() => {
    result.current.onClose();
  });

  // Assert
  expect(result.current.isOpen).toBe(false);
  expect(result.current.itemToDelete).toEqual(selectedItem);
});

it('should clear selected item when accepting', () => {
  // Arrange
  const { result } = renderHook(() => useConfirmationDialog());

  const selectedItem = {
    id: '1',
    name: 'Proyecto de prueba',
  };

  act(() => {
    result.current.onOpenDialog(selectedItem);
  });

  // Act
  act(() => {
    result.current.onAccept();
  });

  // Assert
  expect(result.current.itemToDelete).toEqual({
    id: '',
    name: '',
  });

  expect(result.current.isOpen).toBe(true);
});


});
