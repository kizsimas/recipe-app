import { Plan } from "@prisma/client";

export interface CreatePlanRequest {
    plan: PlanDto
}

export interface CreatePlanResponse {
    plan: PlanDto
}

export interface PlanDto {
    id: number | null;
    name: string;
    planGroups: PlanGroupDto[];
    products: PlanProductDto[]
}

export interface PlanGroupDto {
    id: string;
    name: string;
    planGroupMeals: PlanGroupMealDto[];
}

export type PlanGroupMealDto = {
    name: string;
    recipeId: number;
}

export interface PlanProductDto {
    productId: number;
    unitId: number;
    count: number;
}