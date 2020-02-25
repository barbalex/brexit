//
export default () => {
  if (typeof window === `undefined`) return 1

  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    document.body.offsetWidth
  )
}
