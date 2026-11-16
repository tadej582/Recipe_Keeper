export type Recipe = {
    id: number;
    name: string;
    tag: string | null;
    servings: number | null;
};


export type RecipeInput = 
    Pick<Recipe, "name" | "tag" | "servings">;
