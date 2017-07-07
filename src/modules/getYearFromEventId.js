// @flow
export default (id: string): number => {
  const idArray = id.split('_')
  const year = parseInt(idArray[1], 10)
  return year
}
