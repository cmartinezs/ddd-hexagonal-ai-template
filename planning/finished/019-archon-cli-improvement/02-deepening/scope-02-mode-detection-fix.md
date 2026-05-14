# Scope 02: Mode Detection Fix

> [← 01-expansion.md](../01-expansion.md)

## Priority

Alta

## Workflow Type

BUG-FIX

## Description

Corregir detectMode() para que detecte proyecto primero y use ARCHON_DEV_TEMPLATE_PATH como override, no como modo excluyente. Actualmente, si existe la variable de entorno, retorna inmediatamente `mode: 'dev'` sin verificar si está dentro de un proyecto Archon.

## Affected Files

- `packages/archon-cli/src/core/mode-detector.ts`

## Current Problem

```typescript
// Comportamiento actual
if (process.env.ARCHON_DEV_TEMPLATE_PATH) {
  return { mode: 'dev', ... };
}
// Luego detecta proyecto (demasiado tarde)
```

## Correct Logic Order

1. Si existe `.archon/state.json` → `project`
2. Si comando es `templates` → `template-cache`
3. Si existe `ARCHON_DEV_TEMPLATE_PATH` fuera de proyecto → `dev/user` con template override
4. Si no hay nada → `user`

## Tasks

1. **Reordenar detectMode()**
   - [ ] Mover detección de proyecto al inicio
   - [ ] Mover detección de comando templates después de proyecto
   - [ ] Mover ARCHON_DEV_TEMPLATE_PATH como override, no modo principal

2. **Preservar funcionalidad dev**
   - [ ] Mantener capacidad de override de template en modo dev
   - [ ] No romper el caso de uso: `ARCHON_DEV_TEMPLATE_PATH=../template archon generate --template local`

3. **Agregar tests**
   - [ ] Test: con ARCHON_DEV_TEMPLATE_PATH fuera de proyecto → dev
   - [ ] Test: con ARCHON_DEV_TEMPLATE_PATH dentro de proyecto → project
   - [ ] Test: sin ARCHON_DEV_TEMPLATE_PATH dentro de proyecto → project

## Dependencies

- **Blocking:** Ninguno (puede ejecutarse en paralelo con scope 1)

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.