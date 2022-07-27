import { PrismaClient, Unit } from "@prisma/client";

const prisma = new PrismaClient();

export const getUnits = async (): Promise<Unit[]> => {
    return await prisma.unit.findMany(); 
}

export const createUnits = async (units: Unit[]): Promise<number> => {
    const saveResult = await prisma.unit.createMany({
        data: [...units]
    });
    return saveResult.count;
}