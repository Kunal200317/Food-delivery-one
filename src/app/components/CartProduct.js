import React from 'react'
import Image from 'next/image'
const CartProduct = ({ product, OnRemove, CartProductPrice, Index }) => {
    return (

        <div
            className='flex gap-4 items-center border-b border-gray-300 p-3 '
        >
            <div>
                <Image src={product?.image && product.image.length > 0 ? product.image : '/pngegg.png'} width={100} height={100} alt='pizza' />
            </div>
            <div className='grow'>
                <h3 className='font-bold'>{product?.name}</h3>
                {product.size && (
                    <div className='text-gray-700 text-xs font-semibold'>
                        Size: {product?.size?.name} ₹{product?.size?.price}
                    </div>
                )}
                {product?.extras?.length > 0 && (
                    <div className='text-gray-500 text-xs font-semibold'>
                        Extras: {product.extras.map((extra, index) => (
                            <div key={index} className='text-gray-500 text-xs font-semibold'>
                                {extra.name} ₹{extra.price}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='text-sm font-bold'>
                ₹{CartProductPrice(product)}
            </div>
            <div>
                {!!OnRemove && (
                    <button
                        onClick={() => OnRemove(Index)}
                        className='text-white bg-primary hover:bg-red-500 px-4 py-1 rounded-md ml-3'
                    >
                        <img className='w-4' src="/delete.svg" alt="Delete" />
                    </button>
                )}
            </div>
        </div>

    )
}

export default CartProduct
