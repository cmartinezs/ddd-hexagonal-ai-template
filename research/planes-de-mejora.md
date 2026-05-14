# Diagnóstico ejecutivo

Analicé el repo `cmartinezs/ddd-hexagonal-ai-template`, principalmente `packages/archon-cli`. No hice cambios en el repositorio; esto es un análisis estático sobre la estructura y código disponible.

**Veredicto:** Archon ya está bien encaminado como producto CLI global, pero todavía arrastra inconsistencias propias de estar naciendo dentro del template. No es solo "separarlo de ddd-hexagonal"; antes conviene estabilizar el núcleo, corregir bugs de flujo, alinear documentación con comportamiento real y recién después extraerlo como producto/repo independiente.

El propio repo ya contiene la intención correcta: Archon como CLI instalable globalmente, con cache global de templates, `.archon/` por proyecto, outputs en `docs/`, adapters de agentes y upgrade/versionado de template. Esa orientación está documentada en el análisis interno del repo.

---

## Lo que está bien

Archon ya tiene una base de producto real. El paquete existe como `@archon/cli`, define binario `archon`, usa workspace npm y tiene scripts de build/typecheck. Además, el README del CLI ya presenta una UX bastante clara: `archon init`, `status`, `prompt`, `check`, `next`, `run`, integración con agentes, cache de templates y estructura `.archon/` por proyecto.

También está bien tomada la decisión de usar:

- `docs/` para outputs reales del proyecto
- `.archon/` para estado, configuración, prompts, contexto y runs
- `template.lock.json` para asociar un proyecto a una versión de template
- `~/.archon/templates/` como cache global
- Modos `user`, `project`, `dev`, `template-cache`

La separación conceptual entre template source y project output es correcta. El `init` ya crea un proyecto en el directorio actual, genera `docs/`, `.archon/context`, `.archon/prompts`, `.archon/runs`, copia guías y crea estado/config/lock.

---

## Bloqueantes técnicos que corregiría primero

### 1. `migration-manager.ts` probablemente no compila

En `loadChangelog(_from, _to)` los parámetros están nombrados como `_from` y `_to`, pero dentro del método se usan variables `from` y `to` que no existen. Con el tsconfig en `strict`, `noUnusedLocals`, `noImplicitReturns` y `noUncheckedIndexedAccess`, esto debería romper `npm run build` o `npm run typecheck`.

**Corrección:** renombrar parámetros a `from`/`to` o usar `_from`/`_to` correctamente. Además, esa búsqueda de changelog debería hacerse con `RegExp`, no con interpolación dentro de regex literal.

### 2. `Validator.checkDependencies()` valida en una ruta equivocada

`checkPhaseFiles()` busca correctamente en `docs/<phase.folder>`, pero `checkDependencies()` busca en `<project>/<dep.folder>` y además espera un archivo `.status`. Eso no calza con el `init`, que crea las fases bajo `docs/`, ni con el estado real, que vive en `.archon/state.json`.

**Corrección:** validar dependencias contra `state.phases`, no contra `.status`. Si se quiere validar evidencia documental, buscar en `docs/<folder>`.

### 3. `templates pull` no respeta realmente versiones

El comando documentado/recomendado es algo tipo `archon templates pull ddd-hexagonal-ai-template@1.0.0`, pero el código actual toma `args[0]` como target completo y `args[1]` como versión. No parsea `id@version`. Además, clona el repo con `git clone --depth 1` sin checkout de tag/ref, pero luego registra `ref: v<version>`.

Eso rompe reproducibilidad: puedes creer que instalaste `0.1.0`, pero en realidad clonaste la rama default del momento.

**Corrección:** parsear `id@version`, hacer checkout explícito de tag/commit, guardar `commitSha`, calcular manifest/checksum y fallar si el tag no existe.

### 4. Agentes declarados vs agentes realmente implementados

El README y los tipos declaran soporte para `opencode`, `claude`, `cursor`, `gemini` y `manual`. Pero `AgentAdapterFactory` solo registra `opencode` y `claude`.

Eso significa que `archon agent --set cursor` puede aceptarse, pero luego `archon run` falla porque no existe adapter real.

**Corrección:** dividir estados de soporte:

- `supported`: `opencode`, `claude`
- `prompt-only`: `manual`
- `planned`: `cursor`, `gemini`

O implementar adapters mínimos para `cursor`/`gemini` antes de exponerlos como opción válida.

### 5. El checksum del estado es frágil

`StateManager.save()` escribe `state.json` con newline final, pero calcula el checksum sobre `stateContent` sin ese newline; luego `validate()` lee el archivo completo con newline y compara contra `state.checksum`. Eso puede producir falsos errores de integridad.

Además, guardar checksum dentro del mismo `state.json` y también en `state.checksum` introduce una circularidad innecesaria.

**Corrección:** eliminar `checksum` de `ArchonState` y dejar solo `state.checksum` externo, calculado de forma canónica sobre el contenido real o sobre un JSON normalizado sin checksum.

---

## Problemas funcionales importantes

### 1. El CLI promete más de lo que garantiza

El README lista comandos maduros: `upgrade`, `templates`, `doctor`, `prompts`, `agent`, `run`, `serve`, etc. Pero algunos están parcialmente implementados. Por ejemplo, `templates update` solo informa cuántas versiones hay y `templates remove` dice "not yet implemented". `check --fix` aparece en código, pero está como TODO.

**Recomendación:** no ocultarlos, pero marcarlos explícitamente como `experimental` o `planned`. Para una CLI productizable, es mejor tener menos comandos confiables que muchos comandos semi-reales.

### 2. Hay divergencia entre README raíz y Archon

El README raíz sigue describiendo el template con `01-templates/data-output` como documentación productiva. Pero Archon inicializa proyectos con `docs/` como salida real.

**Recomendación:** declarar formalmente:

- En el repo template: `01-templates/` es source
- En proyectos Archon: `docs/` es output
- `data-output` debería quedar como legado, ejemplo o eliminarse del relato principal

### 3. `upgrade` no actualiza realmente el origen del template

`MigrationManager.updateTemplateLock()` cambia solo `version` y `resolvedAt`, pero no cambia `cachePath`, `ref`, `source` ni `commitSha`. Entonces un proyecto podría quedar con lock diciendo versión nueva, pero apuntando al cache viejo.

**Corrección:** `upgrade` debe resolver primero el template destino en cache, validar que existe, y actualizar lock completo:

```json
{
  "id": "...",
  "version": "...",
  "source": "...",
  "ref": "...",
  "commitSha": "...",
  "cachePath": "..."
}
```

### 4. `init` todavía mezcla modo producto con modo dev

`init` busca un template local ascendiendo por carpetas y mirando markers como `01-templates`, `.git`, `AGENTS.md`, `00-guides-and-instructions`. Eso ayuda mientras desarrollas, pero como producto puede provocar que Archon use accidentalmente un repo local en vez del template cacheado.

**Recomendación:** mover esa conducta a modo dev explícito:

```bash
ARCHON_DEV_TEMPLATE_PATH=../ddd-hexagonal-ai-template archon init --name demo
archon dev link-template ../ddd-hexagonal-ai-template
```

En modo usuario normal, resolver solo desde cache/registry.

---

## Refactoring recomendado

La estructura actual funciona para crecer rápido, pero los comandos están acumulando demasiada lógica. `RunCommand`, por ejemplo, hace detección de modo, prompts interactivos, generación de contexto, construcción de prompt, diagnóstico de agente, token tracking, dry-run, confirmación, ejecución y tracking de runs en una sola clase.

Estructura propuesta:

```
packages/archon-cli/src/
├── cli/
│   ├── program.ts
│   └── commands/
│       ├── init.command.ts
│       ├── run.command.ts
│       └── check.command.ts
│
├── domain/
│   ├── phase/
│   ├── template/
│   ├── project-state/
│   └── validation/
│
├── application/
│   ├── init-project.usecase.ts
│   ├── generate-prompt.usecase.ts
│   ├── run-agent.usecase.ts
│   ├── check-phase.usecase.ts
│   └── upgrade-project.usecase.ts
│
├── infrastructure/
│   ├── fs/
│   ├── git/
│   ├── cache/
│   ├── agents/
│   │   ├── opencode.adapter.ts
│   │   └── claude.adapter.ts
│   ├── state/
│   └── template-registry/
│
└── ui/
    ├── renderers/
    └── prompts/
```

**Regla simple:** los comandos solo parsean input y llaman casos de uso. Nada de lógica de negocio en comandos.

---

## Qué reemplazaría

Primero, reemplazaría el parser manual. El binario `archon.ts` parsea flags a mano, pero el paquete ya depende de `commander`. Esto genera inconsistencias: algunos flags existen en comandos pero no en parser global.

Dependencias recomendadas:

- **`commander`** para comandos/subcomandos
- **`zod`** o **`valibot`** para validar config, state, lock y registry
- **`execa`** para ejecutar `git`, `opencode`, `claude` sin strings shell inseguros
- **`env-paths`** para cache global multiplataforma en vez de hardcodear `~/.archon` (el cache actual usa `homedir()` y `.archon` directamente)
- **`semver`** en todos lados (hoy existe `semver`, pero `global-cache` usa comparación manual `split('.')`)

---

## Qué eliminaría o congelaría

- `promptForMissing()` en `state-manager.ts` — parece duplicar flujos interactivos ya resueltos con `inquirer`/`FirstInteractive`
- El array local `PHASES` dentro de `next.ts` — ya existe `phaseEngine`
- Soporte visible para `cursor` y `gemini` mientras no existan adapters reales
- `templates remove` como comando visible si no está implementado
- `checksum` dentro de `state.json`
- Fallback silencioso a template local/ancestro en lógica productiva

---

## Dónde puede crecer Archon funcionalmente

Archon tiene potencial para dejar de ser "CLI que ordena documentación" y convertirse en orquestador de ciclo de vida AI-native.

Las extensiones más valiosas serían:

**`archon generate phase 2`**
Generar archivos base reales desde templates hacia `docs/`.

**`archon review --phase 2`**
Revisar calidad documental: completitud, ambigüedad, trazabilidad, duplicidad, mezcla RF/RNF/CU.

**`archon trace`**
Crear matriz automática: Discovery → Requirements → Design → Development → Tests → Monitoring.

**`archon diff --template 0.1.0..0.2.0`**
Mostrar impacto de actualizar template antes de migrar.

**`archon quality`**
Score de salud del proyecto: fases incompletas, documentos vacíos, referencias rotas, decisiones sin ADR, requirements sin tests.

**`archon doctor --ci`**
Modo no interactivo para pipelines.
