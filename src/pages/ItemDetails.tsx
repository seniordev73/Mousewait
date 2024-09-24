import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


const ItemDetails: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number,
    rating: number,
    description: string
  }>()

  const navigate = useNavigate()
  const { id } = useParams()

  
  // Fetch one pizza and set data to store

  useEffect(() => {
    const featchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62aba2a1bd0e5d29af136c7a.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        console.log(error)
        navigate('/')
      }
    }
    featchPizza()
  }, [])

  if (!pizza) {
    return (
      <div>Loading ...</div>
    )
  }

  return (

    <div className="container">
      <div className="pizza-details">
        <div className="pizza-details__wrapper">
          <div>
            <img className="pizza-details__image" alt="pizza" src={pizza.imageUrl} />
          </div>
          <div>
            <h2 className="pizza-details__title">{pizza.title}</h2>
            <p className="pizza-details__raiting">Raiting: {pizza.rating}</p>
            <p>{pizza.description}</p>
            <p className="pizza-details__price">Price: ${pizza.price}</p>
            <Link to="/">
              <button className="button button--outline button--add pizza-details__botton">
                <span>Back</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails