FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js postcss.config.mjs tailwind.config.js ./
COPY public ./public
COPY src ./src
COPY messages ./messages

RUN npm run build

FROM nginx:1.27-alpine AS production

ENV PORT=8080

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD /bin/sh -c 'wget -qO- "http://127.0.0.1:$$PORT/" >/dev/null || exit 1'
