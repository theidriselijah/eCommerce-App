import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProductItem = ({id, image, name, price}) => {

    ProductItem.propTypes = {
        id: PropTypes.any,
        image: PropTypes.any,
        name: PropTypes.any,
        price: PropTypes.any,
    }

    const {currency} = useContext(ShopContext)

  return (
    <Link typeof={`/products/${id}`} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className=' overflow-hidden'>
            <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
        </div>

        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem