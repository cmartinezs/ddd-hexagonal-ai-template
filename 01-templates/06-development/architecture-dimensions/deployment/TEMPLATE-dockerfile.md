[← Index](./README.md)

---

# Dockerfile Template

## Purpose

Template for container images.

## Template

```dockerfile
# === Multi-stage build ===

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .
RUN npm run build

# === Production stage ===

FROM node:20-alpine AS runner

WORKDIR /app

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

USER appuser

EXPOSE 3000

CMD ["node", "dist/main.js"]
```

## Best Practices

| Practice | Why |
|---------|------|
| Multi-stage | Smaller final image |
| Alpine base | Security, size |
| Non-root user | Security |
| .dockerignore | Faster builds |

---

[← Index](./README.md)