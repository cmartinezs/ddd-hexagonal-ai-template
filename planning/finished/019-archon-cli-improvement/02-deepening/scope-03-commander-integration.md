# Scope 03: Commander Full Integration

> [← 01-expansion.md](../01-expansion.md)

## Priority

Alta

## Workflow Type

REFACTORING

## Description

Completar la implementación de Commander para que sea el parser único de opciones, eliminando parseOpts() y getArg(). Actualmente hay tres fuentes de verdad: Commander + parseOpts() + getArg().

## Affected Files

- `packages/archon-cli/src/application/program.ts`
- `packages/archon-cli/src/application/commands/*.ts`

## Current State

```typescript
// program.ts
program
  .allowUnknownOption()
  .passThroughOptions()
// commands/*.ts
const name = getArg('name');
const phase = parseOpts('--phase');
```

## Target State

```typescript
program
  .command('init')
  .option('--name <name>')
  .option('--agent <agent>')
  .action(async (opts) => {
    await new InitCommand().run(opts);
  });

program
  .command('generate')
  .option('--phase <phase>')
  .option('--template <template>')
  .action(async (opts) => {
    await new GenerateCommand().run(opts);
  });
```

## Tasks

1. **Audit de comandos actuales**
   - [ ] Listar todos los comandos y sus opciones actuales
   - [ ] Identificar qué usan getArg() vs parseOpts()

2. **Refactorizar program.ts**
   - [ ] Definir opciones con .option() para cada comando
   - [ ] Remover .allowUnknownOption() y .passThroughOptions()
   - [ ] Usar opciones de Commander directamente

3. **Actualizar cada comando**
   - [ ] init-command.ts: --name, --agent
   - [ ] status-command.ts: --json, --verbose
   - [ ] generate-command.ts: --phase, --template, --force
   - [ ] run-command.ts: --agent, --phase, --force
   - [ ] check-command.ts: --force
   - [ ] next-command.ts: --phase
   - [ ] templates-command.ts: --list, --pull, --remove, --update
   - [ ] review-command.ts: --phase, --format
   - [ ] trace-command.ts: --term
   - [ ] diff-command.ts: --template, --phase
   - [ ] quality-command.ts: --phase, --format

4. **Eliminar parseOpts y getArg**
   - [ ] Remover parseOpts() de utils
   - [ ] Remover getArg() de utils
   - [ ] Verificar que no queden referencias

5. **Tests de validación**
   - [ ] Test: todos los flags funcionan correctamente
   - [ ] Test: unknown flags son rechazados
   - [ ] Test: help muestra todas las opciones

## Dependencies

- **Blocking:** Scope 1 (Testing Infrastructure) - necesarios para validar cambios

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.