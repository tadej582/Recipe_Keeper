import { render, screen } from "@testing-library/react";
import RecipeList from "./RecipeList";
import { renderWithRouter } from "../test-utils";


test("shows a message when there are no recipes", () => {
    // the empty list renders no items (and so no links) - no router needed here
    render(<RecipeList recipes={[]} onDelete={() => {}} />);
    expect(screen.getByText(/no recipes yet/i)).toBeInTheDocument();
});


test("Rendering two recipes", async () => {

    const recipes = [
        {id: 1, name: 'Pancakes', tag: 'dinner', servings: 5},
        {id: 2, name: 'Apple pie', tag: 'lunch', servings: 4},
    ];

    renderWithRouter(<RecipeList  recipes={recipes} onDelete={() => {}} />);

    expect(await screen.findByText(/Pancakes/i)).toBeInTheDocument();
    expect(await screen.findByText(/Apple pie/i)).toBeInTheDocument();
});