# Campus FindIt Frontend

React + Vite frontend for Campus FindIt. Deploy this repository to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and set:

```env
VITE_API_URL=http://localhost:5000/api
```

For Vercel, set `VITE_API_URL` to your deployed Render URL plus `/api`, for example:

```env
VITE_API_URL=https://campus-findit-api.onrender.com/api
```

No secrets belong in this repository or in Vercel environment variables.
