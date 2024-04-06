import Loader from "../components/Loader"
//* context yaoılarına abone olmamızı sağlayan hook
import { useContext } from "react"
//Abone olmak istediğimiz context yapısı
import { ProductContext } from "../context/productContext"
import Card from "../components/Card";

//? Context Kullanma Aşamaları --2--> Oluşturulan Contexti kullanma
//!Oluşturdugumuz Context Yapılarını kullanmak için useContext hookundan yaralarınız useContext Hooku Olustturdugumuz Contexi Parametre olarak alır .


const MainPage = () => {

    const { products, selectedCategory } = useContext(ProductContext);

    return (
        <div className=" my-5 mt-5 pt-5">
            <h1 className="text-center text-warning">{selectedCategory}</h1>
            <div className="d-flex alig-items-center flex-wrap justify-content-center   gap-3 gap-md-4">
                {!products ? <Loader /> : products.map((item) => <Card product={item} key={item.id} />)}
            </div>
        </div>
    )
}

export default MainPage
