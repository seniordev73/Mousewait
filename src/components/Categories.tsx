import { memo } from "react"

type CategoryPropsType = {
  value: number,
  onChangeCategory: (index: number) => void
}

export const categories = [
  "All",
  "Meat",
  "Vegetarian",
  "Grilled",
  "Spicy",
  "Closed"
]

export const Categories: React.FC<CategoryPropsType> = memo(({ value, onChangeCategory }) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => (
          <li key={index} onClick={() => onChangeCategory(index)} className={value === index ? "active" : ""}>{el}</li>
        ))}
      </ul>
    </div>

  )
})