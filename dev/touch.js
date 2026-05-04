module.exports = (async function() {
  try {
    // Módulos externos:
    const projectRoot = require("path").resolve(__dirname, "..");
    // Módulos internos:
    const file = process.argv.concat([]).splice(2)[0];
    const ModulerBuilder = require(__dirname + "/lib/ModulerBuilder.js");
    const modulerBuilder = ModulerBuilder.from(projectRoot);
    const relfile = file.replace(projectRoot, "");
    const parameters = [ file, relfile, projectRoot, modulerBuilder, ModulerBuilder ];
    // Operaciones:
    await require(__dirname + "/hooks/global.onTouch.js")(...parameters);
    await require(__dirname + "/build.js")(...parameters);
    await require(__dirname + "/test.js")(...parameters);
  } catch (error) {
    // Errores:
    console.error("Error on «touch.js»:", error);
  }
})();