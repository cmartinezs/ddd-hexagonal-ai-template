# Respuesta para opencode: estrategia de interacción entre Archon CLI y agentes AI

## Contexto

La pregunta abierta es cómo debería interactuar el CLI de **Archon** con un agente AI externo, por ejemplo `opencode`.

La duda específica planteada fue:

> Does opencode accept stdin for prompt execution? (`opencode < prompt.md`)  
> If yes → Model B is straightforward.  
> If no → Model A is the baseline, we can explore API integration later.  
> What's your preference?

Mi preferencia es implementar una estrategia **híbrida**, pero con una decisión arquitectónica clara:

> **Archon no debe acoplarse a opencode. Archon debe ser un orquestador arquitectónico agent-agnostic, con adaptadores para distintos agentes.**

Eso significa que `opencode` puede ser el primer adaptador real, pero no debería condicionar el diseño del CLI completo.

---

## Decisión recomendada

Implementar el MVP usando un modelo **A + B híbrido**:

1. **Modelo A como base obligatoria:** Archon siempre genera prompts, contexto y artefactos intermedios en archivos versionados dentro del proyecto.
2. **Modelo B como ejecución opcional:** Archon puede ejecutar el agente automáticamente si existe un adaptador disponible, por ejemplo `opencode`.
3. **No depender de stdin como contrato principal:** aunque eventualmente pueda probarse si `opencode < prompt.md` funciona, no debería ser el mecanismo base, porque no aparece como el flujo principal documentado para ejecución de prompts.
4. **Diseñar integración por adaptadores:** hoy `opencode`, mañana `claude`, `codex`, `cursor`, `gemini`, otro CLI local, o incluso un agente propio.

La idea central es esta:

```txt
Archon CLI
  ├─ genera contexto del proyecto
  ├─ genera prompt arquitectónico
  ├─ genera plan de ejecución
  ├─ registra trazabilidad
  └─ opcionalmente ejecuta mediante un adapter:
       ├─ opencode
       ├─ claude
       ├─ codex
       ├─ custom
       └─ future agents
```

Por lo tanto, la respuesta directa sería:

> **Prefiero que Archon implemente Model A como baseline universal y Model B como adapter opcional. Para opencode, usaría su modo `run` documentado, no `stdin`, salvo que un `doctor`/capability check confirme explícitamente que stdin funciona de manera estable.**

---

## Observación importante sobre opencode

La documentación actual de opencode describe el uso programático mediante:

```bash
opencode run [message..]
```

También documenta:

```bash
opencode run --attach http://localhost:4096 "..."
```

para reutilizar un servidor `opencode serve` ya iniciado.

Además, `opencode run` soporta flags como:

```bash
--model
--agent
--file
--format
--title
--attach
--dir
--continue
--session
```

Eso sugiere que el flujo más estable para Archon no debería ser:

```bash
opencode < prompt.md
```

sino uno de estos enfoques:

```bash
opencode run "<prompt>"
```

O mejor, para prompts largos y contexto estructurado:

```bash
opencode run \
  --file .archon/prompts/phase-3-2026-05-12.md \
  --file .archon/context/project-context.md \
  --title "Archon phase 3" \
  "Execute the Archon task described in the attached prompt and context files."
```

Esto evita depender de stdin y reduce el riesgo de problemas por longitud de argumentos, quoting, caracteres especiales o diferencias entre shells.

También existe `opencode acp`, que usa stdin/stdout con ND-JSON, pero eso corresponde a un protocolo de agente, no necesariamente a “leer un prompt plano desde stdin”. Por eso no conviene mezclar ambos conceptos.

---

## Decisión práctica para el MVP

Para el MVP, propongo implementar estos comandos:

```bash
archon init
archon context scan
archon prompt --phase 3 --context full
archon run --agent opencode --phase 3
archon validate
archon status
```

El flujo sería:

```txt
1. archon context scan
   - Analiza estructura del proyecto.
   - Detecta stack, carpetas, convenciones y documentación existente.
   - Escribe snapshot en .archon/context/.

2. archon prompt --phase 3 --context full
   - Genera prompt completo para la fase solicitada.
   - Escribe archivo en .archon/prompts/.
   - No ejecuta ningún agente.

3. archon run --agent opencode --phase 3
   - Genera o reutiliza el prompt.
   - Invoca el adapter opencode.
   - Ejecuta opencode usando su modo documentado.
   - Guarda logs, metadata y resultado.

4. archon validate
   - Ejecuta validaciones propias del template.
   - Revisa estructura, convenciones, archivos esperados, naming, tests, documentación, etc.
```

---

## Contrato recomendado del adapter

El CLI debería tener una interfaz interna equivalente a esto:

```ts
interface AgentAdapter {
  id: string;
  displayName: string;

  detect(): Promise<AgentDetectionResult>;
  doctor(): Promise<AgentDoctorResult>;

  execute(request: AgentExecutionRequest): Promise<AgentExecutionResult>;
}
```

Donde `AgentExecutionRequest` podría contener:

```ts
interface AgentExecutionRequest {
  cwd: string;
  promptFile: string;
  contextFiles: string[];
  title?: string;
  model?: string;
  agent?: string;
  session?: string;
  continueSession?: boolean;
  attachUrl?: string;
  dryRun?: boolean;
  outputFormat?: "default" | "json";
}
```

Y el adapter de opencode decidiría cómo traducir eso a comandos reales.

Ejemplo:

```bash
opencode run \
  --file .archon/prompts/phase-3-2026-05-12.md \
  --file .archon/context/project-context.md \
  --title "Archon phase 3" \
  --dir . \
  "Execute the Archon task described in the attached files."
```

Si se usa servidor persistente:

```bash
opencode serve
```

Y luego:

```bash
opencode run \
  --attach http://localhost:4096 \
  --file .archon/prompts/phase-3-2026-05-12.md \
  --file .archon/context/project-context.md \
  --title "Archon phase 3" \
  "Execute the Archon task described in the attached files."
```

---

## Por qué no conviene depender de `opencode < prompt.md`

Aunque el piping por stdin sería cómodo, tiene varios problemas para un CLI que busca ser serio y reutilizable:

1. **No es el contrato principal documentado para prompts.** El flujo documentado es `opencode run [message..]`.
2. **Puede romperse entre versiones.** Si stdin no está diseñado como API estable, puede cambiar sin aviso.
3. **Es ambiguo.** Stdin puede significar muchas cosas en CLIs interactivos: entrada del TUI, protocolo, comandos, raw text, etc.
4. **Tiene problemas de UX.** Es más difícil explicar errores, logs, archivos adjuntos, sesiones y metadata.
5. **Reduce trazabilidad.** Archon necesita dejar evidencia de qué prompt se ejecutó, con qué contexto y bajo qué configuración.
6. **Complica Windows/Git Bash/PowerShell.** Los pipes, escapes, encoding y redirecciones suelen comportarse distinto entre entornos.

Por eso, incluso si stdin funciona, yo lo dejaría como capability secundaria:

```bash
archon run --agent opencode --transport stdin
```

pero no como default.

---

## Modos de ejecución recomendados

### 1. `prompt-file` — modo base universal

```bash
archon prompt --phase 3 --context full
```

Salida esperada:

```txt
.archon/prompts/phase-3-2026-05-12.md
.archon/context/project-context.md
```

Ventajas:

- funciona con cualquier agente
- auditable
- reproducible
- simple de debuggear
- no depende de APIs externas

---

### 2. `agent-run` — ejecución automática con adapter

```bash
archon run --agent opencode --phase 3
```

Internamente:

```txt
1. Genera contexto.
2. Genera prompt.
3. Detecta opencode.
4. Ejecuta opencode run.
5. Guarda metadata.
6. Ejecuta validaciones posteriores si corresponde.
```

Ventajas:

- experiencia fluida
- un solo comando
- mantiene trazabilidad
- no rompe compatibilidad con otros agentes

---

### 3. `agent-run --attach` — ejecución con servidor persistente

```bash
archon run --agent opencode --phase 3 --attach http://localhost:4096
```

Este modo es útil si se quiere evitar cold boot de MCPs, plugins o backend de opencode.

---

### 4. `dry-run` — mostrar sin ejecutar

```bash
archon run --agent opencode --phase 3 --dry-run
```

Debería imprimir algo como:

```bash
opencode run \
  --file .archon/prompts/phase-3-2026-05-12.md \
  --file .archon/context/project-context.md \
  --title "Archon phase 3" \
  "Execute the Archon task described in the attached files."
```

Esto es clave para confianza del usuario.

---

## Comandos sugeridos para Archon

### Generación manual de prompt

```bash
archon prompt --phase 3 --context full
```

### Generación y copia al portapapeles

```bash
archon prompt --phase 3 --context full --copy
```

### Ejecución con opencode

```bash
archon run --agent opencode --phase 3
```

### Ejecución con modelo específico

```bash
archon run --agent opencode --phase 3 --model anthropic/claude-sonnet-4-5
```

### Ejecución con agente específico de opencode

```bash
archon run --agent opencode --phase 3 --opencode-agent architect
```

O mejor, usando un naming no acoplado:

```bash
archon run --agent opencode --phase 3 --remote-agent architect
```

### Ver comando sin ejecutarlo

```bash
archon run --agent opencode --phase 3 --dry-run
```

### Diagnóstico de integración

```bash
archon agent doctor opencode
```

Salida esperada:

```txt
Agent: opencode
Status: available
Version: x.y.z
Supports run: yes
Supports file attachments: yes
Supports attach: yes
Supports stdin prompt: unknown/not configured
Recommended transport: file-attachment
```

---

## Configuración sugerida

Archivo:

```txt
.archon/config.json
```

Ejemplo:

```json
{
  "defaultAgent": "opencode",
  "agents": {
    "opencode": {
      "enabled": true,
      "command": "opencode",
      "transport": "file-attachment",
      "defaultModel": null,
      "defaultRemoteAgent": null,
      "attachUrl": null
    }
  },
  "runs": {
    "storeLogs": true,
    "storePromptSnapshot": true,
    "storeGitMetadata": true,
    "validateAfterRun": true
  }
}
```

---

## Estructura de archivos recomendada

```txt
.archon/
  config.json
  state.json

  context/
    project-context.md
    project-map.json
    snapshots/
      2026-05-12T15-30-00Z.json

  prompts/
    phase-3-2026-05-12.md
    create-module-billing-2026-05-12.md

  runs/
    2026-05-12T15-40-00Z-opencode/
      run.json
      command.txt
      stdout.log
      stderr.log
      prompt.md
      context.md
      validation-report.md
```

Esto le da a Archon algo muy importante: **trazabilidad real**.

No basta con “mandar un prompt al agente”. Archon debería poder responder después:

- qué se pidió
- con qué contexto
- qué agente se usó
- qué comando se ejecutó
- qué archivos existían antes
- qué archivos cambiaron después
- qué validaciones pasaron/fallaron

---

## Trazabilidad mínima por ejecución

Cada ejecución debería generar un archivo:

```txt
.archon/runs/<timestamp>-<agent>/run.json
```

Ejemplo:

```json
{
  "id": "2026-05-12T15-40-00Z-opencode",
  "agent": "opencode",
  "transport": "file-attachment",
  "cwd": ".",
  "promptFile": ".archon/prompts/phase-3-2026-05-12.md",
  "contextFiles": [
    ".archon/context/project-context.md"
  ],
  "command": [
    "opencode",
    "run",
    "--file",
    ".archon/prompts/phase-3-2026-05-12.md",
    "--file",
    ".archon/context/project-context.md",
    "--title",
    "Archon phase 3",
    "Execute the Archon task described in the attached files."
  ],
  "startedAt": "2026-05-12T15:40:00Z",
  "finishedAt": null,
  "exitCode": null,
  "git": {
    "branch": "main",
    "commitBefore": "...",
    "dirtyBefore": true
  }
}
```

---

## Seguridad y control

Por defecto, Archon no debería ejecutar agentes en modo peligroso.

Evitar como default:

```bash
opencode run --dangerously-skip-permissions ...
```

Si se soporta, debería requerir una bandera explícita de Archon, por ejemplo:

```bash
archon run --agent opencode --phase 3 --unsafe-agent-permissions
```

Y mostrar una advertencia clara.

También recomiendo agregar:

```bash
archon run --agent opencode --phase 3 --confirm
```

para que el usuario vea:

- prompt generado
- archivos adjuntos
- comando que se ejecutará
- directorio de trabajo
- agente/modelo elegido

antes de confirmar.

---

## Respuesta concreta a la pregunta de preferencia

Mi preferencia es:

```txt
Model A + Model B hybrid.
```

Pero con esta precisión:

```txt
Model A is not just a fallback; it is the architectural foundation.
Model B is an execution convenience implemented through agent adapters.
```

Por lo tanto:

```txt
1. Always generate prompt/context files first.
2. Always keep those files as auditable artifacts.
3. If --run is provided, execute through the selected adapter.
4. For opencode, prefer the documented `opencode run` flow.
5. Do not assume `opencode < prompt.md` as the default contract.
6. Add `archon agent doctor opencode` to detect capabilities.
7. Keep the CLI ready for other agents.
```

---

## Recomendación final para el diseño del MVP

Implementar primero:

```bash
archon prompt --phase 3 --context full
```

Luego:

```bash
archon run --agent opencode --phase 3
```

Donde `archon run` internamente haga:

```txt
1. Resolve phase/task.
2. Build project context.
3. Write prompt file.
4. Write context file.
5. Build opencode command using adapter.
6. Execute command.
7. Store run metadata.
8. Store logs.
9. Optionally validate output.
```

El adapter de opencode debería iniciar con transporte:

```txt
file-attachment
```

y no:

```txt
stdin
```

El transporte `stdin` puede quedar como experimental:

```bash
archon run --agent opencode --phase 3 --transport stdin
```

pero solo después de que `archon agent doctor opencode` confirme que funciona correctamente en el entorno local del usuario.

---

## Conclusión

Archon debería posicionarse como el **orquestador arquitectónico** del proyecto, no como un simple wrapper de opencode.

La responsabilidad de Archon debería ser:

```txt
crear estructura,
generar contexto,
producir prompts reproducibles,
coordinar agentes,
validar resultados,
y mantener trazabilidad del proceso.
```

La responsabilidad de opencode debería ser:

```txt
ejecutar tareas AI sobre el código usando el contexto y las instrucciones que Archon le entrega.
```

Con esa separación, Archon queda bien diseñado desde el inicio:

- compatible con opencode
- extensible a otros agentes
- usable manualmente
- auditable
- reproducible
- vendible como producto serio
- no dependiente de una herramienta externa específica

---

## Referencias verificadas

- OpenCode CLI docs: https://opencode.ai/docs/cli/
- `opencode run [message..]`: https://opencode.ai/docs/cli/#run
- `opencode serve`: https://opencode.ai/docs/cli/#serve
- `opencode acp`: https://opencode.ai/docs/cli/#acp
