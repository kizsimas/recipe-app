import { PrismaClient, Plan } from "@prisma/client";
import { PlanDto } from "./plans.types";

const prisma = new PrismaClient();

export const getPlan = async (planId: number): Promise<Plan | null> => {
    const plan = await prisma.plan.findFirst({
        where: {
            id: planId
        },
        include: {
            planGroups: {
                include: {
                    planGroupMeals: true
                }
            }
        }
    })

    return plan;
}

export const getAllPlans = async (): Promise<Plan[]> => {
    const plans = await prisma.plan.findMany({
        include: {
            planProducts: true,
            planGroups: {
                include: {
                    planGroupMeals: true
                }
            }
        }
    });
    return plans;
}

export const savePlan = async (plan: PlanDto) => {
    const created = await prisma.plan.create({
        data: {
            name: plan.name,
            planProducts: {
                create: plan.products?.map(product => ({
                    productId: product.productId,
                    unitId: product.unitId,
                    value: product.count
                }))
            },
            planGroups: {
                create: plan.planGroups?.map(planGropup => ({
                    name: planGropup.name,
                    planGroupMeals: {
                        create: planGropup.planGroupMeals?.map(groupMeal => ({
                            name: groupMeal.name,
                            recipeId: groupMeal.recipeId,
                        }))
                    }
                }))
            }
        }
    });
    return created;
}