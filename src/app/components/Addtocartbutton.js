import React from 'react';


const Addtocartbutton = ({ hasSizeorExtras, price, HandleaddToCartButtonClick, image }) => {
    if (!hasSizeorExtras) {
        return (
            <div
                onClick={() => HandleaddToCartButtonClick()}
                className='text-white bg-primary hover:bg-secondary py-2 px-4 rounded-full mt-1'
            >
                <span className='text-nowrap text-sm md:text-base'>
                    Add to cart ${price}
                </span>
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => HandleaddToCartButtonClick()}
            className="text-white bg-primary hover:bg-secondary py-2 px-4 rounded-full mt-1"
        >
            <span className="text-nowrap text-sm md:text-base">
                Add to (from ${price})
            </span>
        </button>
    );
};

export default Addtocartbutton;