# 🔍 DEEPENING: Scope 01 — archon-cli: Documentación de referencia (16 comandos + README)

> **Status:** DONE (2026-05-13)
> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)

---

## Objective

Crear la documentación de referencia completa de los 16 comandos de Archon CLI en `packages/archon-cli/docs/commands/` (un archivo por comando, con navegación cruzada entre comandos relacionados) y actualizar el README para enlazar a esta estructura. La guía de caso real se cubre en scope-06.

---

## Decisión de diseño

**✅ Opción B — un archivo por comando en `docs/commands/`**

El README principal conserva tabla de comandos + Quick Start y enlaza a la referencia completa. Cada comando tiene su propio `.md` con documentación exhaustiva. Comandos relacionados se enlazan entre sí. No hay residuales: la documentación se completa en este scope.

---

## Tasks

| # | Task | Workflow | Status | Output |
|---|------|----------|--------|--------|
| 1 | Crear los 16 archivos en `docs/commands/` con estructura estándar y contenido completo | GENERATE-DOCUMENT | DONE | `docs/commands/*.md` (16 archivos) |
| 2 | Añadir sección `## See Also` con navegación cruzada en cada archivo | GENERATE-DOCUMENT | DONE | Todos los `docs/commands/*.md` actualizados |
| 3 | Actualizar `packages/archon-cli/README.md`: tabla de comandos con opciones y enlaces, secciones `## Command Reference` y `## Guides` | GENERATE-DOCUMENT | DONE | `packages/archon-cli/README.md` |

---

## Estructura de carpetas a crear

```
packages/archon-cli/docs/
└── commands/
    ├── init.md
    ├── status.md
    ├── next.md
    ├── check.md
    ├── prompt.md
    ├── context.md
    ├── run.md
    ├── agent.md
    ├── prompts.md
    ├── guide.md
    ├── tutorial.md
    ├── doctor.md
    ├── config.md
    ├── upgrade.md
    ├── templates.md
    └── dev.md
```

> La carpeta `docs/guides/` se crea en scope-06.

---

## Template para cada archivo de comando

Todos los archivos de `docs/commands/` siguen esta estructura:

```markdown
# archon <command>

> <descripción una línea>

## Usage

```bash
archon <command> [options]
```

## Options

| Option | Description |
|--------|-------------|
| ... | ... |

## Subcommands (si aplica)

...

## Behaviour

Descripción detallada del comportamiento, incluyendo:
- Qué lee y qué escribe
- Condiciones de error
- Diferencias entre modos (project / template-dev / global)

## Examples

```bash
# caso básico
# caso con opciones
# caso CI/automatización (si aplica --force u opciones no interactivas)
```

## See Also

- [`archon <related>`](related.md) — razón de la relación
```

---

## Grupos de navegación cruzada

Los `## See Also` se construyen según estos grupos de afinidad:

| Grupo | Comandos | Relación |
|-------|----------|---------|
| Navegación de fase | `status`, `check`, `next` | Flujo central de avance: status → check → next |
| Workflow AI | `prompt`, `context`, `run`, `agent` | Generar prompt → enriquecer contexto → ejecutar agente |
| Biblioteca de prompts | `prompts`, `run` | Prompts acumulados → ejecutados via run |
| Setup de proyecto | `init`, `config`, `agent` | Inicializar → configurar defaults → configurar agente |
| Salud y aprendizaje | `doctor`, `guide`, `tutorial` | Diagnosticar → aprender fase → tutorial guiado |
| Gestión de template | `upgrade`, `templates`, `dev` | Cache → actualizar versión → desarrollo local |

---

## Referencia de comandos (fuente: `src/commands/router.ts`)

| Comando | Opciones (router) | Descripción |
|---------|-------------------|-------------|
| `init` | `[--name <name>] [--agent <opencode\|claude\|manual>]` | Inicializa proyecto desde el template |
| `status` | `[--json]` | Muestra fase actual y progreso |
| `next` | `[--phase <N>] [--force]` | Avanza a la siguiente fase (con jump detection) |
| `check` | `[--phase <N>] [--force]` | Marca fase como completa |
| `prompt` (validate) | `[--phase <N>] [--json] [--fix]` | Valida constraints de la fase actual |
| `prompt` | `[--phase <N>] [--context full\|summary\|none] [--copy]` | Genera prompt AI para una fase |
| `context` | `scan\|inject [--output <dir>]` | Escanea proyecto o inyecta guías al contexto |
| `run` | `--agent <agent> --phase <N> [--dry-run] [--confirm] [--attach <url>]` | Ejecuta agente AI via adapter |
| `agent` | `[--set <opencode\|claude\|manual>] [--doctor] [--agent <name>]` | Configura o diagnostica agente AI |
| `config` | `set\|get\|ls [--key <key>] [--value <value>]` | Gestiona configuración por defecto |
| `guide` | `[--phase <N>]` | Ayuda interactiva para una fase |
| `tutorial` | `[--mode project\|template] [--step <N>]` | Modo tutorial guiado |
| `doctor` | `[--fix]` | Health check e integridad |
| `upgrade` | `[--target <version>] [--dry-run] [--rollback <version>]` | Actualiza template a versión nueva |
| `prompts` | `ls\|rank\|compress\|merge\|expand\|export\|clean [args...]` | Gestiona biblioteca acumulada de prompts |
| `templates` | `ls\|pull\|update\|remove\|doctor` | Gestiona caché global de templates |
| `dev` | `link-template\|unlink-template\|status` | Comandos de desarrollo (enlace local) |

### Features añadidos post-006 (documentar con especial atención)

**Jump detection** (`src/commands/next.ts:67–95`):
- `archon next --phase N`: si `N > currentPhase + 1` → warning + confirmación interactiva
- `--force` bypasses la confirmación
- Fases intermedias marcadas `status: 'skipped'` en `.archon/state.json`
- Una fase skipped se reactiva apuntándola con `--phase N`

**`--force` flag** (`src/commands/router.ts:119,128`):
- Registrado en `next` y `check`
- Omite cualquier prompt interactivo (para CI/automatización)

**`archon context inject`** (`src/commands/context.ts:12–98`):
- Lee `.archon/guides/` + `.archon/AGENTS.md` (copiados por `archon init`)
- Concatena en orden (máx. 3 000 chars c/u): INSTRUCTIONS-FOR-AI, AI-WORKFLOW-GUIDE, SKILLS-AND-PLUGINS-GUIDE, TEMPLATE-ARCHITECTURE
- Guías restantes listadas como referencias
- Output: `.archon/context/context.md` (default) o `--output <path>`
- Auto-incluido en el siguiente `archon run` o `archon prompt --context full`

---

## Cambios en `packages/archon-cli/README.md`

### Tabla de comandos — actualizar con opciones y enlaces

```markdown
| `archon init [--name <n>] [--agent <a>]`       | Initialize new project. [→ ref](docs/commands/init.md) |
| `archon status [--json]`                        | Show phase and progress. [→ ref](docs/commands/status.md) |
| `archon next [--phase <N>] [--force]`           | Advance phase (jump detection). [→ ref](docs/commands/next.md) |
| `archon check [--phase <N>] [--force]`          | Mark phase complete. [→ ref](docs/commands/check.md) |
| `archon prompt [--phase <N>] [--context <l>]`   | Generate AI prompt. [→ ref](docs/commands/prompt.md) |
| `archon context <scan\|inject>`                 | Context files. [→ ref](docs/commands/context.md) |
| `archon run --agent <a> --phase <N>`            | Execute AI agent. [→ ref](docs/commands/run.md) |
| `archon agent [--set <a>] [--doctor]`           | Configure agent. [→ ref](docs/commands/agent.md) |
| `archon prompts <ls\|rank\|compress\|...>`      | Prompt library. [→ ref](docs/commands/prompts.md) |
| `archon guide [--phase <N>]`                    | Phase help. [→ ref](docs/commands/guide.md) |
| `archon tutorial [--mode <m>]`                  | Guided tutorial. [→ ref](docs/commands/tutorial.md) |
| `archon doctor [--fix]`                         | Health check. [→ ref](docs/commands/doctor.md) |
| `archon config <set\|get\|ls>`                  | Config defaults. [→ ref](docs/commands/config.md) |
| `archon upgrade [--target <v>] [--rollback <v>]`| Upgrade template. [→ ref](docs/commands/upgrade.md) |
| `archon templates <ls\|pull\|update\|...>`      | Template cache. [→ ref](docs/commands/templates.md) |
| `archon dev <link-template\|unlink-template>`   | Dev commands. [→ ref](docs/commands/dev.md) |
```

### Sección a añadir antes del cierre del README

```markdown
## Command Reference

Full per-command documentation with options, examples, and cross-navigation:
[`docs/commands/`](docs/commands/)

## Guides

- [Real-World Workflow](docs/guides/real-world-workflow.md) — complete walkthrough using Archon with the DDD Hexagonal Template
```

> El enlace a la guía se añade aquí aunque el archivo se crea en scope-06. Puede dejarse como placeholder o añadirse al README una vez completado scope-06.

---

## Done Criteria

- [ ] Carpeta `packages/archon-cli/docs/commands/` existe con los 16 archivos `.md`
- [ ] Cada archivo sigue la estructura estándar: Usage, Options, Behaviour, Examples, See Also
- [ ] Todos los archivos de un mismo grupo tienen `## See Also` con enlaces cruzados al resto del grupo
- [ ] `docs/commands/next.md` documenta jump detection, `--force`, y reactivación de fases skipped
- [ ] `docs/commands/context.md` documenta `scan` y `inject` (con orden de guías, truncado, auto-injection)
- [ ] `docs/commands/check.md` documenta `--force`
- [ ] README tabla actualizada: cada fila incluye opciones y enlace `[→ ref]` a su archivo
- [ ] README tiene sección `## Command Reference` y `## Guides` con enlaces
- [ ] README tiene sección `## Guides` con placeholder hacia `docs/guides/real-world-workflow.md` (se completa en scope-06)
- [ ] TRACEABILITY.md updated

---

## Inconsistencies Found

| # | Description | Docs Involved | Status | Resolution Path |
|---|-------------|--------------|--------|----------------|
| — | *None yet* | — | — | — |

---

> [← 01-expansion.md](../01-expansion.md) | [← planning/README.md](../../README.md)
