import { test, expect } from "@playwright/test";


test("delete a recipe", async ({ page }) => {
    await page.goto("/");

    
    // Log in through the AuthStatus box
    await page.getByPlaceholder("Email").fill("me@example.com");
    await page.getByPlaceholder("Password").fill("supersecret");
    await page.getByRole("button", { name: /log in/i }).click();
    await expect(page.getByText(/signed in as/i)).toBeVisible();


    // go to the Add page and create a recipe (unioque name so reruns don't collide)
    await page.getByRole("link", { name: "Add" }).click();
    const name = `E2E Pancakes ${Date.now()}`;
    await page.getByPlaceholder("Recipe name").fill(name);
    await page.getByRole("button", { name: /add/i }).click();


    // the router sends us back to the list, and the new recipe is really there
    await expect(page.getByText(name)).toBeVisible();


    // Delete a recipe
    const item = page.getByRole("listitem").filter({ hasText: name });
    await item.getByRole("button", { name: "Delete" }).click();

    await expect(page.getByText(name)).not.toBeVisible();

} )

