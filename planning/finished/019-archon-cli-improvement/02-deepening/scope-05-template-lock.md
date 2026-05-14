# Scope 05: Template Lock Enhancement

> [← 01-expansion.md](../01-expansion.md)

## Priority

Media

## Workflow Type

FEATURE-IMPLEMENTATION

## Description

Mejorar createTemplateLock() para que use source real del registry, ref completa (v<version>), y commit SHA. Actualmente solo guarda información genérica.

## Affected Files

- `packages/archon-cli/src/domain/template/lock-manager.ts`

## Current Problem

```javascript
// lock-manager.ts
createTemplateLock(version, templateId) {
  return {
    templateId,
    version,
    source: 'ddd-hexagonal-ai-template',  // ❌ hardcoded
    ref: 'v' + version,                    // ❌ incompleto
    // sin commitSha
  };
}
```

## Target State

```javascript
createTemplateLock(registryInfo, templateId) {
  return {
    templateId,
    version: registryInfo.version,
    source: registryInfo.source,           // ✅ real source
    ref: 'v' + registryInfo.version,        // ✅ completo
    commitSha: registryInfo.commitSha,      // ✅ desde registry
  };
}
```

## Tasks

1. **Modificar createTemplateLock()**
   - [ ] Aceptar registryInfo como parámetro adicional
   - [ ] Extraer source, ref, y commitSha del registry
   - [ ] Guardar valores reales en lock

2. **Actualizar llamadas**
   - [ ] En InitProjectUseCase, pasar registry info
   - [ ] En TemplatesPullUseCase, pasar registry info
   - [ ] Verificar que todo funcione con el nuevo formato

3. **Actualizar MigrationManager**
   - [ ] Revisar que updateTemplateLock() sea consistente
   - [ ] No duplicar lógica que ya existe en createTemplateLock

4. **Tests**
   - [ ] Test: lock con source real
   - [ ] Test: lock con commitSha
   - [ ] Test: backward compatibility con locks antiguos

## Dependencies

- **Blocking:** Ninguno (puede ejecutarse en cualquier momento)

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.