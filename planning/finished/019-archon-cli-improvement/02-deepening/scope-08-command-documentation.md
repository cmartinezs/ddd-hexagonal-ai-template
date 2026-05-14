# Scope 08: Command Stability Documentation

> [← 01-expansion.md](../01-expansion.md)

## Priority

Baja

## Workflow Type

DOCUMENTATION

## Description

Documentar qué comandos son stable, experimental y planned en README y documentación de comandos.

## Affected Files

- `packages/archon-cli/README.md`
- `packages/archon-cli/docs/commands/` (existing)

## Categorization

### Stable (ready for production)
- init
- status
- check
- next
- run
- generate

### Experimental (functional but may change)
- review
- trace
- diff
- quality

### Planned (not yet implemented)
- templates remove
- templates update

## Tasks

1. **Actualizar README.md**
   - [ ] Agregar sección "Command Stability"
   - [ ] Listar comandos por categoría
   - [ ] Explicar qué significa cada categoría

2. **Actualizar docs/commands/**
   - [ ] Agregar badge de estabilidad a cada comando
   - [ ] Actualizar índice con categorías

3. **Agregar en CLI**
   - [ ] Opcional: agregar `--verbose` o `--stability` flag
   - [ ] Mostrar estabilidad en ayuda de cada comando

4. **Consistency check**
   - [ ] Verificar que planned commands estén marcados como tales
   - [ ] Verificar que AGENT_TIERS sea consistente con planned agents

## Dependencies

- **Blocking:** Ninguno - puede ejecutarse al final

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.