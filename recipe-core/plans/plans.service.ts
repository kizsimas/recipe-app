import { Plan } from '@prisma/client';
import * as planRepository from './plans.repository';
import { PlanDto } from './plans.types';

export const getAllPlans = async (): Promise<Plan[]> => {
    return await planRepository.getAllPlans();
}

export const getPlan = async (planId: number): Promise<Plan | null> => {
    return await planRepository.getPlan(planId);
}

export const savePlan = async (plan: PlanDto) => {
    return await planRepository.savePlan(plan);
}