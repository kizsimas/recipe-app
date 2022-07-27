import express, { Request, Response } from 'express';

import { CreateUnitsRequest, GetUnitsResponse, UnitDto } from './units.types';
import * as unitService from './units.service';
const router = express.Router();

router.get('/', async (req: Request<string>, res: Response<GetUnitsResponse>) => {
  const units: UnitDto[] = await unitService.getUnits(); 
  res.json({ units });
})

router.post('/', async (req: Request<CreateUnitsRequest>, res: Response) => {
  const request = req.body as CreateUnitsRequest;
  const savedUnits = await unitService.createUnits(request.units);
  res.json(savedUnits);
})

export default router;