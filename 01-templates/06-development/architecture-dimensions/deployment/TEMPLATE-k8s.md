[← Index](./README.md)

---

# Kubernetes Template

## Purpose

Template for Kubernetes manifests.

## Template

```yaml
# === Deployment ===

apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health/liveness
            port: 3000
        readinessProbe:
          httpGet:
            path: /health/readiness
            port: 3000

---

# === Service ===

apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP

---

# === Horizontal Pod Autoscaler ===

apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Key Components

| Component | Purpose |
|-----------|---------|
| Deployment | Pod management |
| Service | Networking |
| HPA | Auto-scaling |
| ConfigMap | Config |
| Secret | Sensitive config |

---

[← Index](./README.md)