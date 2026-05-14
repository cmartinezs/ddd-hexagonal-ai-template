# Scope 06: Init Agent Validation

> [← 01-expansion.md](../01-expansion.md)

## Priority

Media

## Workflow Type

FEATURE-IMPLEMENTATION

## Description

Validar en InitCommand que el agente seleccionado sea ejecutable (supported o prompt-only), no planned. Actualmente cursor y gemini aparecen como opción sin indicar que son planned.

## Affected Files

- `packages/archon-cli/src/application/commands/init-command.ts`
- `packages/archon-cli/src/domain/agents/types.ts`

## Current Problem

```typescript
// InitCommand.askAgent()
const agents = ['opencode', 'claude', 'manual', 'cursor', 'gemini'];
// cursor y gemini aparecen sin warning
```

```typescript
// InitProjectUseCase
execute(agentType: AgentType) {
  // Acepta cualquier AgentType, incluyendo planned
}
```

## Target UX

```
✅ opencode — supported
✅ claude — supported
📝 manual — prompt-only
⏳ cursor — planned, not executable yet
⏳ gemini — planned, not executable yet
```

## Tasks

1. **Agregar AgentSupportTier a tipos**
   - [ ] En agents/types.ts, agregar supportTier: 'supported' | 'prompt-only' | 'planned'
   - [ ] Mapear cada agente a su tier

2. **Modificar InitCommand.askAgent()**
   - [ ] Mostrar tier en opciones (✅, 📝, ⏳)
   - [ ] Indicar "not executable yet" para planned
   - [ ] Opcional: filtrar planned del listado

3. **Modificar InitProjectUseCase**
   - [ ] Validar que agentType sea ejecutable antes de guardar
   - [ ] Lanzar error o warning si es planned
   - [ ] Guardar soloAgentType válido

4. **Proteger run-command**
   - [ ] Verificar que esta validación ya existe en RunAgentUseCase
   - [ ] Documentar: run-command ya bloquea agentes planned

5. **Tests**
   - [ ] Test: init con agente planned muestra warning
   - [ ] Test: init con agente planned no permite continuar (o permite con warning)
   - [ ] Test: init con agente supported funciona normalmente

## Dependencies

- **Blocking:** Ninguno (puede ejecutarse en cualquier momento)

## Next

Listo para ejecutar cuando se alcance este scope en el flujo.