import { useContext } from "react"
import { BasketContext } from "../context/basketContext"
import Loader from "../components/Loader"
import BasketItem from "../components/BasketItem"
import { Link } from "react-router-dom"



const BasketPage = () => {

    const { basket, addToBasket, removeFromBasket } = useContext(BasketContext)

    const totalAmount = basket.reduce((total, i) => total + i.amount, 0)

    const totalPrice = basket.reduce((total, i) => total + i.amount * i.price, 0)
    console.log(totalPrice);
    return (
        <div className="mt-5 overflow-x-hidden d-flex flex-column   mw-100  ">
            <h1 className="mt-3 text-warning text-center">Sepet</h1>

            <div className="row ">
                <div className="col-md-8 ">
                    <div className="  mw-100">
                        {basket.length === 0 ? <div className="text-center"><p>Alışverişe devam etmek için Sepete Ürün ekleyiniz</p><Link className="btn btn-primary" to={'/'}>Ürünler</Link></div> : basket.map((item) => <BasketItem key={item.id} product={item} />)}
                    </div>
                </div>
                <div className="col-md-4 bg-dark p-5">
                    <h2>Toplam Ürün Sayısı <span className="text-warning">{totalAmount}</span></h2>
                    <h2>Toplam ödenecek Tutar <span className="text-warning"> $ {totalPrice}</span></h2>


                    <form className="d-flex">
                        <input type="text" className="form-control" placeholder="Promosyon kodunu Giriniz" />
                        <button className="btn btn-warning">Uygula</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BasketPage