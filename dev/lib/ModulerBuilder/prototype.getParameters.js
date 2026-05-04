module.exports = function (extra = {}) {
  return {
    fs,
    path,
    ejs,
    process,
    global,
    ModulerBuilder,
    modulerBuilder: this,
    ...extra,
  };
};