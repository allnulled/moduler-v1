module.exports = {
  isNodejs: typeof global !== "undefined" && typeof require !== "undefined" && typeof process !== "undefined",
  isBrowser: typeof window !== "undefined" && typeof document !== "undefined" && typeof navigator !== "undefined",
};