// Minimal Express server scaffold per specs/001-1/plan.md
// Note: Dependencies are not installed in this sandbox.
// Route modules are stubbed and can be completed in later tasks.

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - express types not available in sandbox
import express from 'express';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { router as calculateRouter } from './api/calculate.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { router as lifeExpectancyRouter } from './api/life-expectancy.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { router as preferencesRouter } from './api/preferences.js';

const app = express();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(express.json());

app.use('/api/calculate', calculateRouter);
app.use('/api/life-expectancy', lifeExpectancyRouter);
app.use('/api/preferences', preferencesRouter);

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

export default app;

