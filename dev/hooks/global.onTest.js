module.exports = function(file, relfile, projectRoot, modulerBuilder) {
  if(relfile.startsWith("/test/")) {
    return null;
  }
  return true;
  console.log(relfile);
  console.log(projectRoot);
};