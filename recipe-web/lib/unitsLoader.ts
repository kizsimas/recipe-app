import { fetchUnits } from "../api/units.service";
import { Unit } from "../types/unit.types";

let unitsData: Unit[] | null = null;

export const fetchUnitsData = async (): Promise<void> => {
    unitsData = await fetchUnits();
}

export const getUnitsData = async (): Promise<Unit[]> => {
    if(!unitsData) {
        await fetchUnitsData();
    }
    return unitsData || [];
}