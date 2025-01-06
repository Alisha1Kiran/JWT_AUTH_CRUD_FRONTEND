import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({productData}) => {
    const navigate = useNavigate();
    console.log("productdata in product card : ", productData);

    // Limit description to 30 words
  const getShortDescription = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...'; // Add ellipsis if truncated
    }
    return text;
  };

  const handleViewProduct = (id) => {
    // Navigate to /product/:id
    navigate(`/product/${id}`);
  };

  return (
    <div className=" flex flex-col rounded-md shadow-2xl bg-sky-200 bg-opacity-40 m-5 items-center hover:bg-cyan-500 group">
        <img className="rounded-lg h-2/4 w-2/4 m-3 md:h-40 md:w-40 group-hover:scale-125 transition-transform duration-300 ease-in-out hover:cursor-pointer" src={productData.image} onClick={() => handleViewProduct(productData._id)}/>
        <div className='flex flex-col justify-start items-center'>
            <h3 className='py-2 font-bold'>{productData.productName}</h3>
            <p className='italic mb-2 px-3'>{getShortDescription(productData.description, 30)}</p>
            <span className='font-medium'>Price: ${productData.price}</span>
        </div>
        <div className=''>
        <button className='my-4 bg-gradient-to-bl from-blue-400 to-cyan-500 rounded-2xl px-6 py-2 group-hover:from-emerald-700 group-hover:to-cyan-600 group-hover:text-teal-200' onClick={() => handleViewProduct(productData._id)}>View</button>
        </div>
    </div>
  )
}

export default ProductCard