import { Unit } from "../types/unit.types";
import {api} from "./apiService";

const unitsUrl = `/units`;

export const fetchUnits = async (): Promise<Unit[]> => {
  const {data} = await api.get<{ units: Unit[] }>(unitsUrl);
  return data.units;
}