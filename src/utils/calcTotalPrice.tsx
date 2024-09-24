import {CartItemType} from '../redux/cart/types'


// Calculate totalPrice
export const calcTotalPrice = (items:CartItemType[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)}