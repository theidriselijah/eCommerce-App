/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import Title from "../components/Title"
import ProductItem from '../components/ProductItem'


const Collection = () => {

  const { products } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (event) => {

  if (category.includes(event.target.value)) {
    setCategory(prevCategory => prevCategory.filter(item => item != event.target.value))
  } else {
    setCategory(prevCategory => [...prevCategory, event.target.value])
  }
  }

  const toggleSubCategory = (event) => {

  if (subCategory.includes(event.target.value)) {
    setSubCategory(prevCategory => prevCategory.filter(item => item != event.target.value))
  } else {
    setSubCategory(prevCategory => [...prevCategory, event.target.value])
  }
  }

  const applyFilter = () => {

    let productsCopy = products.slice()

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let filterProductsCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filterProductsCopy.sort((a, b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter()
        break;
    }

  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      
      {/* Filter Options */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt=""/>
        </p>
        
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} />Men</p>
            <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory} />Women</p>
            <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />Kids</p>
          </div>
        </div>
      

      {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
            <p className="mb-3 text-sm font-medium">Type</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />Topwear</p>
              <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear</p>
              <p className="flex gap-2"><input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />Winterwear</p>
            </div>
          </div>
        </div>

      {/* Right Side */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select onChange={(event) => setSortType(event.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection