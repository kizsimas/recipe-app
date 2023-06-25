import { Unit } from "../types/unit.types";
import {api} from "./apiService";

const unitsUrl = `/units`;

export const fetchUnits = async (): Promise<Unit[]> => {
  const {data} = await api.get<Unit[]>(unitsUrl);
  return data;
}