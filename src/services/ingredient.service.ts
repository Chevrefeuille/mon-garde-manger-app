import http from '../http-common';
import Ingredient from '../types/ingredient.type';

class IngredientService {
  getAll() {
    return http.get<Array<Ingredient>>('/ingredients');
  }

  get(id: string) {
    return http.get<Ingredient>(`/ingredients/${id}`);
  }

  create(data: Ingredient) {
    return http.post<Ingredient>('/ingredients', data);
  }

  update(data: Ingredient, id: string) {
    return http.put<Ingredient>(`/ingredients/${id}`, data);
  }

  delete(id: string) {
    return http.delete<string>(`/ingredients/${id}`);
  }
}

export default new IngredientService();
