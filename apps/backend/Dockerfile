# ===============================
# Stage 1: Build
# ===============================
FROM node:20-alpine AS builder

WORKDIR /app

# Optional: public env versioning
ARG NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_VERSION=$NEXT_PUBLIC_VERSION

# Install deps
COPY package*.json ./
RUN npm ci

# Copy rest of the app
COPY . .

# Generate Prisma (only if using it)
# RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ===============================
# Stage 2: Runtime
# ===============================
FROM node:20-alpine

# Optional: required by bcrypt, OpenSSL, etc.
RUN apk add --no-cache openssl

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app /app

# Install only prod deps
RUN npm ci --omit=dev
RUN npm cache clean --force

# Port Next.js listens on
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "start"]
