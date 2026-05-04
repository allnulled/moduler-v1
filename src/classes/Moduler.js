module.exports = class Moduler {
  constructor(basedir) {
    this.basedir = basedir;
    this.modules = {};
  }
  env = <%-modulerBuilder.includeModuleExportsContent("src/classes/Moduler/prototype.env.js")%>;
  subpath = <%-modulerBuilder.includeModuleExportsContent("src/classes/Moduler/prototype.subpath.js")%>;
  scan = <%-modulerBuilder.includeModuleExportsContent("src/classes/Moduler/prototype.scan.js")%>;
};