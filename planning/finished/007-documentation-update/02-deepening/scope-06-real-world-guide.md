# 🔍 DEEPENING: Scope 06 — archon-cli: Guía de caso real con DDD-hexagonal template

> **Status:** DONE (2026-05-13)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Crear `packages/archon-cli/docs/guides/real-world-workflow.md`: una guía completa y narrativa que muestre cómo usar Archon en un proyecto real de inicio a fin, siguiendo el flujo canónico del template DDD-hexagonal (fases 0–11). Cada sección enlaza a los archivos `docs/commands/` correspondientes (creados en scope-01).

**Audience:** equipos que acaban de hacer `archon init` y necesitan un recorrido completo que va más allá del Quick Start del README.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Crear `docs/guides/real-world-workflow.md` con el flujo completo fases 0–11 | GENERATE-DOCUMENT | DONE | `packages/archon-cli/docs/guides/real-world-workflow.md` |
| 2 | Actualizar `packages/archon-cli/README.md` — completar enlace en sección `## Guides` | GENERATE-DOCUMENT | DONE | `packages/archon-cli/README.md` (quitar placeholder) |

---

## Prerrequisito

Scope-01 debe estar completo: los 16 archivos `docs/commands/*.md` deben existir para que los enlaces cruzados de la guía funcionen.

---

## Estructura propuesta de la guía

```markdown
# Real-World Workflow with Archon + DDD Hexagonal Template

Una guía práctica para llevar un proyecto de cero a documentación completa
usando Archon CLI y el template DDD + Hexagonal Architecture.

---

## Prerequisites

- Node.js 18+
- Archon instalado: `npm install -g @archon/cli`
- Agente AI disponible (opencode recomendado, o claude / manual)

---

## 1. Inicializar el proyecto

```bash
archon init --name "mi-proyecto" --agent opencode
cd mi-proyecto
```

Archon crea la estructura `docs/`, el estado en `.archon/state.json`,
y copia las guías del template a `.archon/guides/`.

→ [archon init](../commands/init.md)

---

## 2. Entender dónde estás

```bash
archon status
archon guide --phase 0
```

`status` muestra la fase actual y el progreso global.
`guide` explica qué se espera en la fase actual del template DDD-hexagonal.

→ [archon status](../commands/status.md) · [archon guide](../commands/guide.md)

---

## 3. Enriquecer el contexto del agente AI

Antes de generar el primer prompt, inyecta las guías del template:

```bash
archon context inject    # carga guías del template → .archon/context/context.md
archon context scan      # añade contexto específico del proyecto
```

Este paso hace que el agente AI tenga acceso al marco DDD-hexagonal completo.

→ [archon context](../commands/context.md)

---

## 4. Generar y ejecutar el prompt de la fase

```bash
archon prompt --phase 0 --context full
archon run --agent opencode --phase 0
```

`prompt` genera el prompt específico para la fase actual con todo el contexto.
`run` lo pasa al agente y registra la ejecución en `.archon/runs/`.

→ [archon prompt](../commands/prompt.md) · [archon run](../commands/run.md)

---

## 5. Validar y avanzar

```bash
archon check
archon next
```

`check` valida que los constraints de la fase se cumplan.
`next` marca la fase como completa y desbloquea la siguiente.

→ [archon check](../commands/check.md) · [archon next](../commands/next.md)

---

## 6. El ciclo se repite para las fases 1–11

El mismo patrón aplica a cada fase del template DDD-hexagonal:

```
guide → context inject → prompt → run → check → next
```

| Fase | Nombre | Foco |
|------|--------|------|
| 0 | Documentation Planning | Configuración del framework, convenciones |
| 1 | Discovery | Contexto del problema, visión, actores |
| 2 | Requirements | User stories, RF/RNF, scope |
| 3 | Design | DDD estratégico, bounded contexts, UI |
| 4 | Data Model | Entidades, relaciones, ERD |
| 5 | Planning | Roadmap, epics, versionado |
| 6 | Development | Arquitectura hexagonal, APIs, ADRs |
| 7 | Testing | Estrategia y planes de test |
| 8 | Deployment | CI/CD, entornos, releases |
| 9 | Operations | Runbooks, incident response |
| 10 | Monitoring | Métricas, alertas, dashboards |
| 11 | Feedback | Retrospectivas, feedback de usuarios |

---

## 7. Saltar fases (cuando una fase no aplica)

Si una fase no es relevante para tu proyecto:

```bash
archon next --phase 3    # salta a fase 3 desde donde estés
```

Archon detecta el salto, muestra un aviso, pide confirmación,
y marca las fases intermedias como `skipped`.

Para automatizar (CI):
```bash
archon next --phase 3 --force
```

→ [archon next — jump detection](../commands/next.md#jump-detection)

---

## 8. Gestionar la biblioteca de prompts

Los prompts generados se acumulan en `.archon/prompts/`.
Puedes revisarlos, comprimirlos y reutilizarlos:

```bash
archon prompts ls           # listar todos los prompts
archon prompts rank         # clasificar por relevancia
archon prompts compress     # comprimir prompts similares
archon prompts export       # exportar para reutilizar en otro proyecto
```

→ [archon prompts](../commands/prompts.md)

---

## 9. Mantener el template actualizado

Cuando salga una nueva versión del template DDD-hexagonal:

```bash
archon upgrade --dry-run    # preview de cambios
archon upgrade              # aplicar actualización
```

Si algo sale mal:
```bash
archon upgrade --rollback 0.1.0
```

→ [archon upgrade](../commands/upgrade.md) · [archon templates](../commands/templates.md)

---

## 10. Troubleshooting frecuente

| Síntoma | Comando | Descripción |
|---------|---------|-------------|
| El agente no tiene contexto del template | `archon context inject` | Recarga las guías en el contexto |
| La fase no avanza | `archon check` | Muestra qué constraints fallan |
| El estado parece corrupto | `archon doctor --fix` | Repara el estado y la integridad |
| El agente configurado no responde | `archon agent --doctor` | Diagnostica disponibilidad del agente |

→ [archon doctor](../commands/doctor.md) · [archon agent](../commands/agent.md)
```

---

## Notas editoriales

- Incluir fragmentos reales de output de consola (o simulados fieles) en cada sección
- Tono: práctico, directo, orientado a alguien que está haciendo esto por primera vez
- No duplicar el contenido de `docs/commands/` — la guía enlaza, no copia
- La tabla de fases puede enlazar a los templates de `01-templates/` del repo si aporta valor
- La sección de troubleshooting puede crecer; dejar espacio para ampliación futura

---

## Done Criteria

- [ ] `packages/archon-cli/docs/guides/real-world-workflow.md` existe
- [ ] La guía cubre el ciclo completo: init → guide → context inject → prompt → run → check → next (fases 0–11)
- [ ] Sección de jump detection con ejemplos interactivo y `--force`
- [ ] Sección de gestión de prompt library (`ls`, `rank`, `compress`, `export`)
- [ ] Sección de upgrade con `--dry-run` y `--rollback`
- [ ] Sección de troubleshooting con al menos 4 casos frecuentes
- [ ] Cada sección enlaza al archivo `docs/commands/` del comando usado
- [ ] La tabla de fases (0–11) está presente con nombre y foco de cada fase
- [ ] Placeholder en README de scope-01 reemplazado por enlace real
- [ ] TRACEABILITY.md updated

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| — | *None yet* | — | — | — |

---

## Residuals

| # | Description | Deferred To | Status |
|---|-------------|------------|--------|
| — | *None* | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)
