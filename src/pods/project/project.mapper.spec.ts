
import { describe, it, expect } from 'vitest';
import { mapProjectFromApiToVm } from './project.mapper';
import type { Project } from './api/project.api-model';

describe('mapProjectFromApiToVm', () => {
  it('should map a project from API to VM', () => {
    // Arrange
    const apiProject: Project = {
      id: '1',
      name: 'Proyecto de prueba',
      isActive: true,
      employees: [
        {
          id: '10',
          employeeName: 'Ana',
          isAssigned: true,
        },
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(apiProject);

    // Assert
    expect(result).toEqual(apiProject);
  });
it('should return an empty project when input is null', () => {
  // Arrange
  const apiProject = null;

  // Act
  const result = mapProjectFromApiToVm(apiProject);

  // Assert
  expect(result).toEqual({
    id: '',
    name: '',
    externalId: '',
    comments: '',
    isActive: false,
    employees: [],
  });
});

it('should return an empty project when input is undefined', () => {
  // Arrange
  const apiProject = undefined;

  // Act
  const result = mapProjectFromApiToVm(apiProject);

  // Assert
  expect(result).toEqual({
    id: '',
    name: '',
    externalId: '',
    comments: '',
    isActive: false,
    employees: [],
  });
});

it('should create a new employees collection without mutating the original', () => {
  // Arrange
  const apiProject: Project = {
    id: '1',
    name: 'Proyecto de prueba',
    isActive: true,
    employees: [
      {
        id: '10',
        employeeName: 'Ana',
        isAssigned: true,
      },
    ],
  };

  // Act
  const result = mapProjectFromApiToVm(apiProject);

  // Assert
  expect(result.employees).toEqual(apiProject.employees);
  expect(result.employees).not.toBe(apiProject.employees);
  expect(result.employees[0]).not.toBe(apiProject.employees[0]);
});

});

