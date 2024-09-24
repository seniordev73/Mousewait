import { calcTotalPrice } from '../utils/calcTotalPrice'
import { calcTotalCount } from '../utils/calcTotalCount'
import { CartItemType } from '../redux/cart/types'

// Get downloaded to local storage json file with added to cart items

export const getCartItemsFromLS = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  const totalCaunt = calcTotalCount(items)
  return {
    items: items as CartItemType[],
    totalPrice: totalPrice as number,
    totalCaunt: totalCaunt as number
  }
}

