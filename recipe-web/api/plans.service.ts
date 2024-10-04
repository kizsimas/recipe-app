import { Plan } from "../types/plan.types";
import {api} from "./apiService";

const productsUrl = `/plans`;

export const fetchPlans = async (): Promise<Plan[]> => {
  const {data} = await api.get<Plan[]>(productsUrl);
  return data;
}

export const createPlan = async (plan: Plan): Promise<Plan> => {
  var {data} = await api.post<Plan>(productsUrl, {
    plan: plan
  });
  return data;
}
