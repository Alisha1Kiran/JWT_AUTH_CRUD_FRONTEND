import React, { useEffect } from 'react'
import ProductCard from './sharedComponent/ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllProducts } from '../slice/productSlice'

const Product = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.Product);

  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  const fetchProducts = async () => {
    await dispatch(fetchAllProducts());
  };

  return (
    <div>
      <h2 className='text-center text-2xl font-extrabold text-co'>Product Dashboard</h2>
      <div className='grid grid-flow-row gap-1 md:grid-cols-3'>
      {product.map((eachProd) => (
      <ProductCard productData={eachProd}/>
      ))
    }
      </div>
      
    </div>
  )
}

export default Product