# moduler-v1

Modulación manual para JS.

## Funciones y ficheros de desarrollo

Los más importantes son:

- `dev/lib/ModulerBuilder/prototype.includeFunctionBodyTemplate.js`
   - Importa el cuerpo de una función como string
   - La función tiene que ser `async? function(...args?) {` y `}`, si no, la regex no funcionará.
   - En esta forma de importación, **sí se evalúa** el javascript del fichero
      - Por lo cual, solo debería haber un `module.exports = ` al principio
      - No valen comentarios ni saltos de línea
- `dev/lib/ModulerBuilder/prototype.includeModuleExportsContent.js`
   - Importa el fichero entero, pero excluyendo la expresión de `module.exports`
   - El módulo tiene que ser `module.exports = ` y `;` al final opcionalmente.
   - En esta forma de importación **no se evalúa** el javascript del fichero
      - Pero igualmente, tiene que empezar por `module.exports = ` el fichero entero
      - No valen comentarios ni saltos de línea
- `dev/lib/ModulerBuilder/prototype.includeTemplate.js`
   - Importa el fichero entero y lo renderiza como una template de EJS
   - El módulo es 100% libre aquí