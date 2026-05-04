# Instrucciones

Cuando ya has instalado el addon, puedes:

- Guardar un fichero de los tipos siguientes y esperar que se autocompile:
   - `*.ocss`
   - `*.ohtml`
   - `*.ojs`
   - `*.ojson`
- En el JS de plantilla tienes las siguientes variables disponibles:
   - `global`
   - `process`
   - `require`
   - `ModulerBuilder`
   - `modulerBuilder` que tiene:
      - `modulerBuilder.basedir` te indica dónde empiezan las rutas para el `modulerBuilder`
      - `modulerBuilder.includeTemplate(templatePath:string, args = {})`
      - `modulerBuilder.includeModuleExportsContent(templatePath:string, args = {})`
      - `modulerBuilder.includeFunctionBodyTemplate(templatePath:string, args = {})`
   - `templateRoot`
   - `document` (de vscode)
   - `context` (de vscode)
   - `__dirname` (inyectado manualmente)
   - `__filename` (inyectado manualmente)

Importantemente, el `modulerBuilder.basedir` será siempre:
   - El primer directorio superior que contenga un `package.json`.
   - O en su defecto, el directorio del mismo fichero que se está compilando.