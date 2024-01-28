/**
 * @IMPORTANT Please not, that this function doesn't work with different currencies, in only applies $ sign to the existing value
 * To handle proper currency conversion the 3rd party library such as dinero should be used
 */
export const toCurrency = (value: string | number) => {
  return Number(value).toFixed(2) + '$'
}

export const isRunsizeInRange = (
  item: string,
  startqty: number,
  endqty: number,
) => {
  const toNumber = Number(item)
  if (
    (toNumber === startqty && toNumber === endqty) ||
    (toNumber > startqty && toNumber < endqty)
  ) {
    return true
  }

  return false
}
