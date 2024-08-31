import { createContext, useState } from "react"
import { products } from "../assets/assets"
import PropTypes from 'prop-types'

export const ShopContext = createContext()


const ShopContextProvider = (props) => {

    ShopContextProvider.propTypes = {
        children: PropTypes.any,
    }
    
    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider