# Scope 07: TypeScript Cleanup

> [← 01-expansion.md](../01-expansion.md)

## Priority

Media

## Workflow Type

REFACTORING

## Description

Ejecutar npm run typecheck y corregir todos los errores de TypeScript. Mantener el codebase libre de errores de tipo.

## Affected Files

- `packages/archon-cli/src/**/*.ts`

## Tasks

1. **Ejecutar typecheck**
   - [ ] Ejecutar `npm run typecheck` en packages/archon-cli/
   - [ ] Documentar todos los errores encontrados
   - [ ] Categorizar porseveridad: error vs warning

2. **Corregir errores**
   - [ ] Arreglar tipos faltantes
   - [ ] Arreglar tipos incorrectos
   - [ ] Arreglar imports faltantes
   - [ ] Arreglar any implícitos

3. **Corregir warnings**
   - [ ] Revisar cada warning
   - [ ] Tipar correctamente o usar `unknown` donde sea apropiado
   - [ ] Documentar si algún warning es aceptable

4. **Verificar que tests pasan**
   - [ ] Ejecutar `npm test` después de los cambios
   - [ ] Asegurar que no hay regressions

5. **Configuración opcional**
   - [ ] Considerar strict: true en tsconfig.json
   - [ ] Considerar agregar noImplicitAny

## Dependencies

- **Blocking:** Scope 1 (Testing) - necesario para verificar que tests pasan
- **Blocking:** Scope 3 (Commander) - cambios pueden introducir errores

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.