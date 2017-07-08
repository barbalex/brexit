//@flow
export default () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth ||
  document.body.offsetWidth
