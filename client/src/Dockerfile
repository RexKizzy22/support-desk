# BUILD STAGE
FROM node:alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

CMD ["pnpm", "build"]

# RUN STAGE
FROM nginx

EXPOSE 3000

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html