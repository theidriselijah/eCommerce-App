import { createContext, useEffect, useState } from "react"
import PropTypes from 'prop-types'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const ShopContext = createContext()


const ShopContextProvider = (props) => {

    ShopContextProvider.propTypes = {
        children: PropTypes.any,
    }
    
    const currency = '$'
    const delivery_fee = 10
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems)

        if (!size) {
            toast.error('Select Product Size')
            return
        }
        
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for(const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                      totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalAmount
    }

const getProductsData = async () => {
    try {
        const response = await axios.get(backendUrl + "/api/product/list");
        if (response.data.success) {
            setProducts(response.data.products)
        } else {
            toast.error(response.data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}

useEffect(() => {
    getProductsData()
})

useEffect(() => {
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem("token"));
    }
}, [token])

    const value = {
        products, 
        currency, 
        delivery_fee, 
        search, 
        setSearch, 
        showSearch, 
        setShowSearch, 
        cartItems, 
        addToCart, 
        getCartCount, 
        updateQuantity, 
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider