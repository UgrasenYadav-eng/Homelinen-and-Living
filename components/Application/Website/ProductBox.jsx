import Image from 'next/image'
import React from 'react'
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import Link from 'next/link'
import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'

const ProductBox = ({ product }) => {

    // ✅ DEFINE imageUrl (this was missing)
    const imageUrl = product?.media?.[0]?.secure_url
        ? product.media[0].secure_url
        : imgPlaceholder.src;

    return (
        <div className='rounded-lg hover:shadow-lg border overflow-hidden'>
            <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug || "")}>
                <Image
                    src={imageUrl}
                    width={400}
                    height={400}
                    alt={product?.media?.[0]?.alt || product?.name || "Product Image"}
                    title={product?.media?.[0]?.title || product?.name || "Product"}
                    className='w-full lg:h-[300px] sm:h-[250px] h-[150px] object-cover object-top'
                    unoptimized
                />
                <div className="p-3 border-t">
                    <h4>{product?.name}</h4>
                    <p className='flex gap-2 text-sm mt-2'>
                        <span className='line-through text-gray-400'>
                            {product?.mrp?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </span>
                        <span className='font-semibold'>
                            {product?.sellingPrice?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                        </span>
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default ProductBox


// import Image from 'next/image'
// import React from 'react'
// import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
// import Link from 'next/link'
// import { WEBSITE_PRODUCT_DETAILS } from '@/routes/WebsiteRoute'
// const ProductBox = ({ product }) => {

//     return (
//         <div className='rounded-lg hover:shadow-lg border overflow-hidden'>
//             <Link href={WEBSITE_PRODUCT_DETAILS(product.slug)}>
//                 <Image
//     src={imageUrl}
//     width={400}
//     height={400}
//     alt={product?.media?.[0]?.alt || product?.name || "Product Image"}
//     title={product?.media?.[0]?.title || product?.name || "Product"}
//     className='w-full lg:h-[300px] sm:h-[250px] h-[150px] object-cover object-top'
//     unoptimized
// />
//                 <div className="p-3 border-t">
//                     <h4>{product?.name}</h4>
//                     <p className='flex gap-2 text-sm mt-2'>
//                         <span className='line-through text-gray-400'>{product?.mrp.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
//                         <span className='font-semibold'>{product?.sellingPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
//                     </p>
//                 </div>
//             </Link>
//         </div>
//     )
// }

// export default ProductBox