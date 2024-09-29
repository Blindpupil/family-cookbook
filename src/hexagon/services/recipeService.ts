import type { InjectionKey } from "vue";
import { RecipeResource } from "@/hexagon/secondary/recipe/RecipeResource";
import { RecipeService } from "@/hexagon/primary/recipe/use-cases";
import { restClient } from "@/hexagon/secondary/RestClient";
import { userResource } from "@/hexagon/services/userService";
import { RecipeHttp } from "@/hexagon/secondary/recipe/RecipeHttp";

const recipeHttp = new RecipeHttp(restClient);

const recipeResource = new RecipeResource(recipeHttp);
const recipeService = new RecipeService(recipeResource, userResource);
const RecipeServiceKey = Symbol() as InjectionKey<RecipeService>;

export { RecipeServiceKey, recipeService };
