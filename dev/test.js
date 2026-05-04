module.exports = async function (...args) {
  const [file, relfile, projectRoot, modulerBuilder, ModulerBuilder] = args;
  const isInSrcDirectory = relfile.startsWith("/src/");
  const isJsFile = relfile.endsWith(".js");
  if (isInSrcDirectory && isJsFile) {
    const beforeTest = await require(__dirname + "/../dev/hooks/global.beforeTest.js")(...args);
    const correspondingTestPath = projectRoot + relfile.replace("/src/", "/test/");
    let hasTest = false;
    try {
      require("fs").readFileSync(correspondingTestPath, "utf8");
      hasTest = true;
    } catch (error) { }
    if (!hasTest) {
      require("fs-extra").outputFileSync(correspondingTestPath, require("fs").readFileSync(__dirname + "/lib/sources/BaseTest.js").toString(), "utf8");
    }
    const afterTest = await require(__dirname + "/../dev/hooks/global.afterTest.js")(...args);
  }
};