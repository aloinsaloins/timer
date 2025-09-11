export interface ApiClientOptions {
  baseUrl?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(opts: ApiClientOptions = {}) {
    // Use env override for GitHub Pages deployments
    const envBase = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
    this.baseUrl = opts.baseUrl ?? envBase ?? '/api';
  }

  async calculate(body: unknown): Promise<Response> {
    return fetch(`${this.baseUrl}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }

  async getLifeExpectancy(params: { gender: 'male' | 'female'; year?: number }): Promise<Response> {
    const q = new URLSearchParams();
    q.set('gender', params.gender);
    if (params.year) q.set('year', String(params.year));
    return fetch(`${this.baseUrl}/life-expectancy?${q.toString()}`);
  }

  async getPreferences(): Promise<Response> {
    return fetch(`${this.baseUrl}/preferences`);
  }

  async savePreferences(body: unknown): Promise<Response> {
    return fetch(`${this.baseUrl}/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  }
}
