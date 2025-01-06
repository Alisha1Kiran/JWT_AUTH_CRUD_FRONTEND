import React, {useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../slice/productSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {productData, loading, error} = useSelector((state) => state.Product)
    console.log("id : ", productData);

    useEffect(() => {
        fetchProductsData();
      }, [id,dispatch]);
    
      const fetchProductsData = async () => {
        await dispatch(fetchProductById(id));
      };

  return (
    !loading && (
        <div className='flex flex-col mx-2 mt-10 pb-10 px-4 w-full items-center gap-2 bg-sky-800 bg-opacity-60 rounded-md shadow-2xl md:flex-row md:w-3/4'>        
    <h1 className='font-sans text-cyan-950 text-3xl font-extrabold my-5 animate-bounce md:hidden'>{productData.productName}</h1>
    <img className='rounded-lg h-2/4 w-2/4 md:h-80 md:w-2/4  md:mt-10 group-hover:scale-125 transition-transform duration-300 ease-in-out' src={productData.image}/>
        <div className='flex flex-col gap-y-1'>
        <h1 className='hidden font-sans text-cyan-950 text-3xl font-extrabold my-10 animate-bounce md:block'>{productData.productName}</h1>
        <p className='text-justify text-lg'>{productData.description}</p>
        <div className='text-l'><span className='font-bold'>Category:</span> {productData.category}</div>
        <div className='text-l'><span className='font-bold'>Price: </span>${productData.price}</div>
        <div className='text-l'><span className='font-bold'>Stock: </span>{productData.stock}</div>
        </div>
    </div>
    )
    
  )
}

export default ProductDetail