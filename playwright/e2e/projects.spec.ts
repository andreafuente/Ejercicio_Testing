
import { test, expect, type Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('/login');

  await page.locator('input[name="user"]').fill('admin');
  await page.locator('input[name="password"]').fill('test');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/#\/submodule-list$/);
}

test('should display the projects list', async ({ page }) => {
  // Arrange
  await login(page);

  // Act
  await page.goto('/#/projects');

  // Assert
  await expect(
    page.getByPlaceholder('Buscar proyecto')
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Nuevo proyecto' })
  ).toBeVisible();
});


test('should filter projects by name', async ({ page }) => {
  // Arrange
  await login(page);
  await page.goto('/#/projects');

  const search = page.getByPlaceholder('Buscar proyecto');

  await expect(search).toBeVisible();

  // Act
  await search.fill('Bankia');

  // Assert
  await expect(search).toHaveValue(
    'Bankia'
  );

  await expect(
    page.getByRole('row').filter({
      hasText: 'Bankia',
    })
  ).toHaveCount(1);
});


test('should filter projects by name with no results', async ({ page }) => {
  // Arrange
  await login(page);
  await page.goto('/#/projects');

  const search = page.getByPlaceholder('Buscar proyecto');
  const rows = page.getByRole('rowgroup').last().getByRole('row');

  await expect(rows.first()).toBeVisible();

  // Act: buscar un proyecto sin resultados
  await search.fill('MiBanco');

  // Assert
  await expect(rows).toHaveCount(0);

  // Act: limpiar la búsqueda
  await search.clear();

  // Assert
  await expect(rows.first()).toBeVisible();
});


test('should navigate to create project', async ({ page }) => {
  // Arrange
  await login(page);
  await page.goto('/#/projects');

  // Act
  await page.getByRole('button', {
    name: 'Nuevo proyecto',
  }).click();

  // Assert
  await expect(page).toHaveURL(/#\/projects\/0$/);
});
