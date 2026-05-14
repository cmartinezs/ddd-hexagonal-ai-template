# Veredicto Actualizado: Análisis de Mejoras Archon-CLI

## Resumen Ejecutivo

**Estado:** ✅ Mejorado significativamente  
**Recomendación:** No separar como producto independiente aún

Opencode aplicó varias correcciones importantes:
- ✅ Migración del binario hacia Commander
- ✅ Separación de capas: CLI / Application / Domain / Infrastructure
- ✅ Eliminación del checksum embebido en state.json
- ✅ Correcciones del template cache
- ✅ Nuevos comandos funcionales: generate, review, trace, diff, quality

**Conclusión:** El problema ha evolucionado de "mala estructura" a **madurez de producto, consistencia CLI y confiabilidad operacional**.

---

## Tabla de Contenidos

1. [Cambios Positivos Confirmados](#cambios-positivos-confirmados)
2. [Problemas Aún Pendientes](#problemas-aún-pendientes)
3. [Riesgo Técnico Nuevo](#riesgo-técnico-nuevo)
4. [Prioridad Recomendada](#prioridad-recomendada)
5. [Conclusión](#conclusión)

---

## Cambios Positivos Confirmados

### 1. Parser CLI Mejorado

**Antes:** El binario parseaba flags manualmente.  
**Ahora:** `bin/archon.ts` delega en `createProgram()` y `program.ts` usa Commander.

**Observación crítica:** Todavía existe un parser manual interno `parseOpts()` y muchos comandos siguen utilizando `getArg()`. El problema no desapareció completamente.

```
Estado actual: Commander + Parser propio + Parsing local por comando
```

---

### 2. Refactor Por Capas Iniciado

`StateManager` ahora funciona como facade en `core`, y la implementación real pasó a `infrastructure/state`.

**Avances:**
- ✅ Tipos de dominio separados
- ✅ Ejemplo: `project-state.types.ts`, `validation.types.ts`, etc.
- ✅ Estructura en la dirección correcta

---

### 3. Checksum Corregido

**Cambio principal:** Se eliminó checksum desde `ArchonState`; ahora se guarda fuera, en `state.checksum`.

**Resoluciones:**
- ✅ Corrección de circularidad detectada anteriormente
- ✅ El cálculo ahora usa JSON sin newline
- ✅ Tanto `save()` como `validate()` hacen trim()
- ✅ Falso mismatch por salto de línea final **RESUELTO**

---

### 4. Validator.checkDependencies() Mejorado

**Cambio:** Validación contra `docs/<phase-folder>` en lugar de `<project>/<phase>` con `.status`.

**Resoluciones:**
- ✅ Bug de ruta principal corregido
- ✅ Lógica de búsqueda de dependencias optimizada

---

### 5. Templates Pull Mejorado

**Mejoras implementadas:**

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| Parse | Manual | `id@version` |
| Ejecución | Shell nativo | `execa` |
| Tags | Versiones genéricas | Tag explícito `v<version>` |
| Seguridad | `rm -rf` | `rmSync` |
| Trazabilidad | No | Commit SHA guardado |

**Resultado:** Mejora real en **seguridad y reproducibilidad**.

---

### 6. Soporte de Agentes Mejorado

Se agregó `AGENT_TIERS` con tres niveles:
- `supported`: opencode, claude
- `prompt-only`: manual
- `planned`: cursor, gemini

`run.command.ts` bloquea agentes `planned` antes de ejecutar.

**Resolución:** Corrige el problema de prometer ejecución para adapters inexistentes.

---

### 7. Casos de Uso Creados

`RunCommand` fue descompuesto estructuralmente.

**Antes:** Efectuaba todas las operaciones centralizadas.  
**Ahora:** Delega en casos de uso especializados.

**Nuevos casos de uso:**
- `GeneratePromptUseCase`
- `RunAgentUseCase`
- `GeneratePhaseUseCase`
- `ReviewPhaseUseCase`
- `TraceProjectUseCase`
- `DiffTemplateUseCase`
- `QualityScoreUseCase`

**Impacto:** Complejidad del comando reducida significativamente.

---

## Problemas Aún Pendientes

### 1. El Script de Test Sigue Siendo Placeholder

**Estado actual en `package.json`:**

```json
"test": "echo \"No tests configured yet\" && exit 0"
```

**Impacto crítico:** El proyecto puede "pasar tests" sin testear nada.

**Prioridad:** ⚠️ **ALTA**

**Implementación necesaria:**

Agregar Vitest o Node test runner. Tests mínimos requeridos:

- [ ] `state-manager.test.ts`
- [ ] `template-resolver.test.ts`
- [ ] `templates-command.test.ts`
- [ ] `validator.test.ts`
- [ ] `generate-phase.usecase.test.ts`
- [ ] `run-agent.usecase.test.ts`

---

### 2. Commander Está a Medio Camino

**Problema:** `program.ts` usa Commander pero no define opciones reales por comando.

```typescript
// Patrón actual (incompleto):
.allowUnknownOption()
.passThroughOptions()
// Luego: parseOpts(rawArgs)

// Patrón ideal:
program
  .command('init')
  .option('--name <name>')
  .option('--agent <agent>')
  .action(async (opts) => {
    await new InitCommand().run(opts);
  });
```

**Problema de diseño:** Tres fuentes de verdad actualmente:

1. Commander
2. `parseOpts()`
3. `getArg()` dentro de cada command

**Riesgo:** Late o temprano generará bugs de flags.

---

### 3. detectMode() Tiene Problema Serio con Dev Mode

**Ubicación:** `mode-detector.ts`

**Problema crítico:** Si existe `ARCHON_DEV_TEMPLATE_PATH`, retorna inmediatamente `mode: 'dev'` antes de verificar si estás dentro de un proyecto Archon.

**Comportamiento roto:**

```bash
ARCHON_DEV_TEMPLATE_PATH=../template archon status
```

Si estás dentro de un proyecto, `status`, `run`, `check`, `generate`, etc. pueden creer que no estás en modo project.

**Corrección recomendada:**

Detectar proyecto primero y usar dev template como dato adicional, no como modo excluyente.

**Orden sugerido:**

1. ✅ Si estoy dentro de `.archon/state.json` → `project`
2. ✅ Si el comando es `templates` → `template-cache`
3. ✅ Si hay `ARCHON_DEV_TEMPLATE_PATH` fuera de proyecto → `dev/user` con template override
4. ✅ Si no hay nada → `user`

---

### 4. Init Puede Aceptar Agentes Planned Sin Advertencia

**Problema:** `InitCommand.askAgent()` ofrece Cursor junto a opencode, claude y manual **sin indicar que es planned**.

**Adicionalmente:** `InitProjectUseCase` acepta cualquier `AgentType`, incluyendo cursor y gemini, y lo guarda en estado/config.

**Impacto UX:** Usuario crea proyecto con agente que no puede ejecutar. Luego `run` lo bloquea.

**Recomendación:** En init, mostrar claridad de soporte:

```
✅ opencode — supported
✅ claude — supported
📝 manual — prompt-only
⏳ cursor — planned, not executable yet
⏳ gemini — planned, not executable yet
```

O directamente ocultar planned en init.

---

### 5. Templates Remove Sigue Sin Implementar

**Estado:** Aparece como `[planned]`, pero no hace nada real.

**Recomendación:** 
- Opción A: Ocultarlo del listado principal
- Opción B: Implementarlo completamente

Para cache management, `remove` es básico.

---

### 6. Templates Update Todavía No Actualiza

**Comportamiento:** Solo cuenta versiones en cache e indica usar `pull`.

**Está bien como:** Placeholder explícito, pero funcionalmente no es "update".

**Opciones:**

- Renombrarse a: `archon templates status`
- O implementar realmente: `archon templates update` para consultar tags remotos disponibles

---

### 7. createTemplateLock() Todavía Guarda Source Poco Preciso

**Problema:** 

```javascript
source: 'ddd-hexagonal-ai-template'
ref: 'v' + version
```

No usa el source real del registry ni commit SHA.

**Compensación:** `MigrationManager.updateTemplateLock()` sí intenta actualizar source, commitSha, cachePath y ref desde registry.

**Recomendación:** Hacer que `createTemplateLock()` también lea registry y deje el lock inicial completo desde el primer init.

---

### 8. Review, Trace, Quality Son Buenos, Pero Todavía Heurísticos

**Limitaciones:**

- `ReviewPhaseUseCase` detecta placeholders, archivos vacíos, falta de H2 y links, pero **no valida** si un RF está bien escrito, si un RNF es medible, si hay mezcla requerimiento/diseño
- `TraceProjectUseCase` extrae términos desde H2 y negritas, pero puede generar **falsos positivos/falsos negativos**

**Posicionamiento recomendado:** Como análisis heurístico, no como revisión semántica fuerte.

---

## Riesgo Técnico Nuevo

### Facades en Core

**Problema:** Muchos facades en `core` que reexportan desde `infrastructure`.

**Ejemplo:**
```
core/state-manager.ts → solo reexporta desde infrastructure/state/state-manager.js
```

**Impacto:** Si se queda así demasiado tiempo, `core` se vuelve una capa ambigua.

**Estrategia de Migración:**

| Fase | Acción |
|------|--------|
| Actual | `core/*` puede reexportar para compatibilidad |
| Siguiente | `application` importa desde `domain/infrastructure` explícitamente |
| Final | Eliminar `core` como "capa cajón" |

---

## Prioridad Recomendada

Atacar en este orden:

1. **[CRÍTICA]** Agregar tests reales
2. **[Alta]** Corregir detectMode con `ARCHON_DEV_TEMPLATE_PATH`
3. **[Alta]** Hacer que Commander parseé opciones reales por comando
4. **[Media]** Implementar o esconder templates remove/update
5. **[Media]** Mejorar createTemplateLock con source/ref/commitSha reales
6. **[Media]** Validar init contra AgentSupportTier
7. **[Media]** Ejecutar `npm run typecheck` y corregir errores de TS
8. **[Baja]** Documentar claramente qué comandos son stable, experimental y planned

---

## Conclusión

**Veredicto:** Opencode hizo una mejora importante. La base ya se ve mucho más como producto CLI real que como script interno del template.

**Bloqueante para separación:** Todavía no separaría `archon-cli` a un repo independiente hasta resolver **tres cosas fundamentales:**

1. ✋ Tests reales
2. ✋ Mode detection robusto
3. ✋ Commander como parser único

**Después de eso:** Sí tendría sentido separar Archon como producto propio y dejar `ddd-hexagonal-ai-template` como template source/versionado.

---

**Documento actualizado:** 2026-05-14  
**Estado:** Análisis completo  
**Siguiente revisión:** Post-implementación de prioridades
