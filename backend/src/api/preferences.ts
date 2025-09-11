// Stub router for GET/POST /api/preferences
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - express types not available in sandbox
import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Preferences GET not implemented' } });
});

router.post('/', (_req, res) => {
  res.status(501).json({ error: { code: 'NOT_IMPLEMENTED', message: 'Preferences POST not implemented' } });
});

