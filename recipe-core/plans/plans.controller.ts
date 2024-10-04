import express, { Request, Response } from 'express';
import { CreatePlanRequest, PlanDto } from './plans.types';
import * as planService from './plans.service';
import { Plan } from '@prisma/client';
const router = express.Router();

router.get("/:planId", async (req: Request, res: Response<Plan | null>) => {
    const planId = req.params.planId;
    const plan = await planService.getPlan(parseInt(planId));
    res.json(plan);
})

router.get("/", async (req: Request, res: Response<Plan[]>) => {
    const plans = await planService.getAllPlans();
    res.json(plans)
});

router.post("/", async (req: Request<CreatePlanRequest>, res: Response<Plan>) => {
    const plan = req.body.plan as PlanDto;
    const savedPlan = await planService.savePlan(plan);
    res.json(savedPlan);
});

export default router;