FROM node:lts AS build
RUN npm install -g pnpm
WORKDIR /app
ADD . .
RUN pnpm install --dangerously-allow-all-builds
RUN pnpm build

FROM caddy:alpine AS runtime
COPY ./Caddyfile /etc/caddy/Caddyfile
RUN mkdir -p /content
COPY --from=build /app/dist /content/
EXPOSE 8080
