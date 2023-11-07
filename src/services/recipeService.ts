import type { InjectionKey } from "vue";
import { RecipeResource } from "@/secondary/recipe/RecipeResource";
import { RecipeService } from "@/primary/recipe/use-cases";
import { restClient } from "@/secondary/RestClient";
import { userResource } from "@/services/userService";
import { RecipeHttp } from "@/secondary/recipe/RecipeHttp";

const recipeHttp = new RecipeHttp(restClient);

const recipeResource = new RecipeResource(recipeHttp);
const recipeService = new RecipeService(recipeResource, userResource);
const RecipeServiceKey = Symbol() as InjectionKey<RecipeService>;

export { RecipeServiceKey, recipeService };
