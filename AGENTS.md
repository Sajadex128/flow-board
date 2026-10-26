<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Happiness storefront — working notes

The repo now hosts the **Happiness** Persian storefront (Next.js 16 App Router, RTL).
The original board app still lives at `/boards` and `/settings`.

## Running it here

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- `Dockerfile.base44` installs dependencies only (no source is baked in). The repo is
  bind-mounted at `/app` and `node_modules` lives in the `node_modules` named volume, so
  `next dev` picks up edits without a rebuild.
- `prisma generate` runs at container start, not at image build: at build time only the
  manifests are present, so `@prisma/client`'s postinstall cannot find `prisma/schema.prisma`.
- The `prisma:warn ... libssl/openssl` line in the logs is harmless — the storefront never
  touches Prisma at runtime.
- Requires `NEXTAUTH_SECRET` (used by next-auth in the root layout). It is delivered via
  `/run/base44/app.env`; `.env.base44-defaults` holds only non-secret local values and is
  listed first so real secrets always win.

## Sandbox specifics

- `next.config.ts` allow-lists the preview origin (`allowedDevOrigins`) only when
  `BASE44_PREVIEW_MODE === "1"`; outside preview mode the list is empty.
- Dev server binds `0.0.0.0:3000`; the preview proxy serves it on host port 3000.
- `middleware.ts` only guards `/login`, `/register`, `/boards/*`, `/settings/*`. The whole
  storefront is public — do not widen the matcher or the site becomes login-gated.

## Layout of the code

- `src/data/products.ts` — single source of truth for products, flavours, categories,
  ingredients and FAQ copy. Prices, sizes and availability there are **sample data**.
- `src/app/(site)/` — public storefront routes with their own header/footer layout.
- `src/components/site/` — storefront components; `home/` holds the homepage sections in
  the order they appear on the page.

## Verifying in the preview

- The preview's SPA `navigate` helper does **not** drive the Next App Router here (it
  pushState's the URL without the route rendering). Drive the app's own `<Link>`s instead,
  e.g. click the header's «محصولات» / «خانه» links, or the cart icon.
- The cart is persisted in `localStorage` under `happiness-cart-v1`.
- Placing an order (cart → «ثبت سفارش») stores it under `happiness-orders-v1` and returns a
  code like `HP-XXXXXX`; `/order-tracking?code=…` looks that order up. Both are client-side
  only — no payment gateway or server order is involved.
