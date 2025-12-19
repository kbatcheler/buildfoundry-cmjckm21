# BuildFoundry Render.com Deployment Template
# This Dockerfile is automatically generated for each client project
# Version: 2.0.0 - Optimized for Render.com

# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install Yarn 1.x globally (matching our validation environment)
# Remove existing yarn binaries forcefully to avoid EEXIST conflicts
RUN rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg /usr/local/lib/node_modules/yarn || true
RUN npm install -g yarn@1.22.19

# Copy only package.json (not yarn.lock - let Docker generate it fresh)
COPY package.json ./

# Install dependencies with Yarn (always, since we control package.json)
RUN yarn install --production=false

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js application (output to .next/standalone as configured)
RUN yarn build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

# Expose port for Render
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application (Next.js standalone creates server.js at root)
CMD ["node", "server.js"]