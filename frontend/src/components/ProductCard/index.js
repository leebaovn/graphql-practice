import React from 'react'
import './productCard.style.css';
import Button from './../Button';

function ProductCard({ imgUrl, title, description, addToCart }) {
  return (
    <div className='card'>
      <div className='card__thumb'>
        <img src={imgUrl} className='card__thumb--img' />
      </div>
      <div className='card__info'>
        <div className='card__info--title'>{title}</div>
        <div className='card__info--description'>{description}</div>
      </div>
      <div className='card__actions'>
        <Button onClick={addToCart}>Add To Cart</Button>
      </div>
    </div>
  )
}

export default ProductCard
