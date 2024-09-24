import {CartItemType} from '../redux/cart/types'


// Calculate totalCaunt
export const calcTotalCount = (items:CartItemType[]) => {
  const totalCaunt = items.reduce((sum, obj) => obj.count + sum, 0)
  return totalCaunt
}