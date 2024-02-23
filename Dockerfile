FROM node:20.11.1 AS base
 
FROM base AS deps
 
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

FROM base
 
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY ./dist /app/dist

ENV NODE_ENV production

CMD ["node", "./dist/index.js"]