# FUTA FindIt Frontend

React + Vite frontend for FUTA FindIt. Deploy this repository to Vercel. This
repository has no Express server, database, or backend deployment files.

## Run locally

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and set:

```env
VITE_API_URL=http://localhost:5000/api
```

For Vercel, add this single public environment variable before deploying. It
tells the browser where the already-hosted Render API is located:

```env
VITE_API_URL=https://futa-findit.onrender.com/api
```

On Render, set `CLIENT_URL` to the exact Vercel address, for example
`https://futa-findit.vercel.app`. This permits the Vercel frontend to call the
API. `CLIENT_URL` alone does not provide the API address to a browser, so
`VITE_API_URL` is also required on Vercel.

The frontend now talks to the live Render API and expects real user accounts
created through the signup form.
