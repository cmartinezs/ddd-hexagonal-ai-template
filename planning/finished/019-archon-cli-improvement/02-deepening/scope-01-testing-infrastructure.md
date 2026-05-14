# Scope 01: Testing Infrastructure Setup

> [← 01-expansion.md](../01-expansion.md)

## Priority

CRÍTICA

## Workflow Type

INFRASTRUCTURE-SETUP

## Description

Agregar Vitest y configurar tests reales para los módulos principales de archon-cli. El proyecto actualmente tiene un placeholder en package.json que no ejecuta tests reales.

## Affected Files

- `packages/archon-cli/package.json`
- `packages/archon-cli/vitest.config.ts` (new)
- `packages/archon-cli/tests/` (new directory)

## Deliverables

- [ ] Agregar Vitest como devDependency
- [ ] Crear vitest.config.ts con configuración apropiada
- [ ] Crear tests/state-manager.test.ts
- [ ] Crear tests/template-resolver.test.ts
- [ ] Crear tests/templates-command.test.ts
- [ ] Crear tests/validator.test.ts
- [ ] Crear tests/generate-phase.usecase.test.ts
- [ ] Crear tests/run-agent.usecase.test.ts

## Tasks

1. **Setup Vitest**
   - [ ] Agregar `vitest` y `@vitest/coverage-v8` a devDependencies
   - [ ] Crear `vitest.config.ts` con ts-jest, coverage, y globals: true
   - [ ] Agregar script `test` y `test:coverage` en package.json

2. **State Manager Tests**
   - [ ] Test load() cuando state no existe
   - [ ] Test save() con checksum
   - [ ] Test validate() con checksum correcto
   - [ ] Test validate() con checksum incorrecto

3. **Template Resolver Tests**
   - [ ] Test resolve() para template válido
   - [ ] Test resolve() para template no encontrado
   - [ ] Test getVersion() parsing

4. **Templates Command Tests**
   - [ ] Test pull con id@version válido
   - [ ] Test pull con tag inválido
   - [ ] Test list con cache vacío

5. **Validator Tests**
   - [ ] Test checkDependencies() con fases completas
   - [ ] Test checkDependencies() con fases faltantes

6. **UseCase Tests**
   - [ ] Test GeneratePhaseUseCase.execute()
   - [ ] Test RunAgentUseCase.execute() con agente blocked

## Dependencies

Ninguna - es el primer scope

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.