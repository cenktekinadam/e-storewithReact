import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { BasketContext } from "../context/basketContext";


const BasketItem = ({ product }) => {
    const { addToBasket, removeFromBasket, decreaseAmoount } = useContext(BasketContext);
    return (

        <div className='d-flex gap-4 align-items-center bg-black rounded p-4 justify-content-center'>

            <div className='border bg-white rounded-3'>
                <img src={product.image} height={80} width={80} className='object-fit-contain' />
            </div>

            <div className=''>
                <p className=' text-truncate fw-bold'>{product.title.length > 20 ? product.title.slice(0, 20) + '...' : product.title}</p>
                <p>Kategori:{product.category}</p>
                <p>Reyting:{product.rating.rate}</p>
            </div>
            <div className="d-sm-flex flex-wrap  flex-column">
                <div className='bg-secondary rounded-5 d-flex border gap-4 align-items-center  btn-wrapper'>
                    <button onClick={() => decreaseAmoount(product.id)} className='bg-dark text-white'>-</button>
                    <span>{product.amount}</span>
                    <button onClick={() => addToBasket(product)} className='bg-dark text-white'>+</button>
                </div>
                <h4 className=" text-center">${product.price * product.amount}</h4>
                <button onClick={() => removeFromBasket(product.id)} className=" rounded-2 bg-dark    
                d-none d-md-block text-white"><MdDelete /></button>
            </div>
        </div>


    )
}

export default BasketItem
