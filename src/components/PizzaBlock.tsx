import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { addItem } from '../redux/cart/slice'
import {CartItemType} from '../redux/cart/types'
import {selectCartItemById} from '../redux/cart/selectors'

type PizzaBlockPropsType = {
  id: string,
  price: number,
  title: string,
  imageUrl: string,
  sizes: number[],
  types: number[]
}

export const pizzaTypeName = [
  "thin",
  "traditional"
]

export const PizzaBlock: React.FC<PizzaBlockPropsType> = ({ id, price, title, imageUrl, sizes, types }) => {

  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const cartItem = useSelector(selectCartItemById(id))
  const dispatch = useDispatch()
  const countItmes = cartItem ? cartItem.count : 0

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypeName[activeType],
      size: sizes[activeSize],
      count: 1,
    }
    dispatch(addItem(item))
  }

  return (

    <div className="pizza-block">
      <Link
        to={`/pizza/${id}`}
        key={id}
      >
        <img
          className="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li onClick={() => setActiveType(index)} key={index} className={activeType === index ? "active" : ""}>{pizzaTypeName[type]}</li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li onClick={() => setActiveSize(index)} key={index} className={activeSize === index ? "active" : ""}>{size}"</li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">start from ${price}</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {countItmes > 0 && <i>{countItmes}</i>}
        </button>
      </div>
    </div>

  )
}
