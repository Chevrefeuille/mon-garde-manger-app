import http from '../http-common';
import Ingredient from '../types/ingredient.type';
import { AxiosResponse } from 'axios';

class IngredientService {
  getAll(): Promise<AxiosResponse<Ingredient[]>> {
    return http.get<Array<Ingredient>>('/ingredients');
  }

  get(id: string): Promise<AxiosResponse<Ingredient>> {
    return http.get<Ingredient>(`/ingredients/${id}`);
  }

  create(data: Ingredient): Promise<AxiosResponse<Ingredient>> {
    return http.post<Ingredient>('/ingredients', data);
  }

  update(data: Ingredient, id: string): Promise<AxiosResponse<Ingredient>> {
    return http.put<Ingredient>(`/ingredients/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse> {
    return http.delete<string>(`/ingredients/${id}`);
  }
}

export default new IngredientService();
