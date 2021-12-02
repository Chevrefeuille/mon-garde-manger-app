import http from '../utils/http-common';
import IngredientInstance from '../types/ingredientInstance.type';
import { AxiosResponse } from 'axios';

class IngredientService {
  getAll(): Promise<AxiosResponse<IngredientInstance[]>> {
    return http.get<IngredientInstance[]>('/ingredient-instances');
  }

  get(id: string): Promise<AxiosResponse<IngredientInstance>> {
    return http.get<IngredientInstance>(`/ingredient-instances/${id}`);
  }

  create(data: IngredientInstance): Promise<AxiosResponse<IngredientInstance>> {
    return http.post<IngredientInstance>('/ingredient-instances', data);
  }

  update(
    data: IngredientInstance,
    id: string,
  ): Promise<AxiosResponse<IngredientInstance>> {
    return http.put<IngredientInstance>(`/ingredient-instances/${id}`, data);
  }

  delete(id: string): Promise<AxiosResponse<IngredientInstance>> {
    return http.delete<IngredientInstance>(`/ingredient-instances/${id}`);
  }
}

export default new IngredientService();
