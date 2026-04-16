# Mini Shopee Backend

Standalone Node.js + Express + MongoDB API for the Mini Shopee frontend.

## Run

1. Copy `.env.example` to `.env`
2. Start MongoDB
3. Run:

```bash
npm install
npm run dev
```

The API defaults to `http://localhost:5000`.

## Endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products`
- `PATCH /api/products/:id/status`
- `DELETE /api/products/:id`

The backend auto-seeds sample products when the collection is empty.
