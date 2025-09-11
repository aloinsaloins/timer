// Stub router for POST /api/calculate
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - express types not available in sandbox
import { Router } from 'express';

export const router = Router();

router.post('/', (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Calculation endpoint not implemented' } });
});

