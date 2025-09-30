# # Stage 1: Build the app
# FROM node:20-alpine AS builder

# WORKDIR /app

# RUN npm install -g pnpm

# # Copy only files needed for dependency install first
# COPY package.json pnpm-lock.yaml* ./

# RUN pnpm install

# # Copy all other source files
# COPY . .

# RUN pnpm build

# # Stage 2: Run the app
# FROM node:20-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# RUN npm install -g pnpm

# COPY package.json pnpm-lock.yaml* ./

# RUN pnpm install --prod

# # Copy the build output from builder
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.mjs ./next.config.mjs

# EXPOSE 8100

# CMD ["pnpm", "start"]


# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install

COPY . .
RUN pnpm build

# Stage 2: Run the app
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 8100

CMD ["pnpm", "next", "start", "-p", "8100", "-H", "0.0.0.0"]
