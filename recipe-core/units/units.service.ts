import { Unit } from '@prisma/client';
import * as unitRepository from './units.repository';
import { UnitDto, UnitInput } from './units.types';

export const getUnits = async (): Promise<UnitDto[]> => {
    const units: Unit[] = await unitRepository.getUnits();
    return units.map(unit => ({ id: unit.id, measurement: unit.measurement }) as UnitDto); 
}

export const createUnits = async (units: UnitInput[]): Promise<number> => {
    const mappedUnits = units.map(unit => ({measurement: unit.measurement}) as Unit)
    return unitRepository.createUnits(mappedUnits);
};
