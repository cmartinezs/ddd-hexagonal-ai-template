# Scope 04: Templates Command Implementation

> [← 01-expansion.md](../01-expansion.md)

## Priority

Media

## Workflow Type

FEATURE-IMPLEMENTATION

## Description

Implementar o esconder los comandos `templates remove` y `templates update`. Actualmente ambos están como [planned] pero no hacen nada real.

## Affected Files

- `packages/archon-cli/src/application/commands/templates-command.ts`

## Current State

- `templates remove`: aparece en help pero no hace nada
- `templates update`: solo cuenta versiones y dice "use pull"

## Options Analysis

### Option A: Implementar completamente

**Remove:**
- Eliminar template específico del cache
- Actualizar cache registry

**Update:**
- Consultar tags remotos disponibles
- Comparar con versiones en cache
- Suggest updates disponibles

### Option B: Esconder del listing

- Ocultar remove y update de help
- Mantener solo: list, pull, status

## Tasks

1. **Decision y planificación**
   - [ ] Definir: implementar o esconder

2. **Si implementar (Option A)**
   - [ ] Implementar templates remove con rmSync de cache
   - [ ] Implementar templates update con git ls-remote
   - [ ] Agregar tests para ambos

3. **Si esconder (Option B)**
   - [ ] Remover remove de command definitions
   - [ ] Remover update de command definitions
   - [ ] Documentar en README que están fuera

4. **Cleanup general**
   - [ ] Actualizar ayuda del comando
   - [ ] Verificar que no haya errores de TypeScript

## Dependencies

- **Blocking:** Ninguno (puede ejecutarse en cualquier momento)

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.