import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useState } from "react"
import { toast } from "react-toastify";

//! a) Context yapsının temelini oluşturur



export const BasketContext = createContext();


//!b) Verilerin bileşenlere aktarıcak olan sağlayıcıyı ve onun tuttugu verileri tanımlama 
export const BasketProvider = ({ children }) => {
    //* Sağlayıcıda Tutulmasını isteediğimiz Yani Her Componente ulaşabileceğimiz state ve metotları tanımladık
    //* Sepete (local Storage ) Ürün ekleyen fonksiyon
    const [basket, setBasket] = useLocalStorage('sepet', []);

    const addToBasket = (addedProduct) => {
        /* Sepete bir ürünü iki kere yüklemek yerine varolan ürünü güncellememiz gerekir  Bu aşamada */
        /*! 1)Spette bu ürün önceden eklenmişmi kontrol etmeliyiz  */
        const found = basket.find((i) => i.id === addedProduct.id);
        if (found) {
            /*! 2)Spette bu ürün varsa miktarını 1 arttır  */

            /*2-aBulunan ürünün miktarını bir arttır Nesneyi gğcelle */
            const updated = { ...found, amount: found.amount + 1 }

            /*2-b Spett dizisindeki eski ürün yerine güncel halini koy,/*/
            const newBasket = basket.map((i) => (i.id === updated.id ? updated : i))

            /*2-c Stati Güncelle*/
            setBasket(newBasket)
            toast.success(`Sepeteki ürün Arttırıldı Toplamda ${updated.amount} adet var`)
        } else {
            /*! 1)Spette bu ürün yoksa  miktarı 1 olarak ürün ekle  */
            toast.success("Ürün sepete eklendi")
            setBasket(basket.concat({ ...addedProduct, amount: 1 }))

        }

    }
    //* Sepetten ürün silme tıklanıldıgı anda tıklanılan ürünün idsini aldık
    const removeFromBasket = (delete_id) => {
        //* Var olan dizi koşula bağlı filtrelenir ve silinecek eleman  dışarısında kalan elmanlar ile yeni dizi oluşturulur
        const filtred = basket.filter((i) => i.id !== delete_id)
        //*State güncelledik
        setBasket(filtred)
        toast.warning("Ürün Sepetten Kaldırıld")
    }
    const decreaseAmoount = (decrease_id) => {
        //! Sepetteki ürünü azaltma 

        //* 1) Sepetteki ürünü azaltmak için önce ürün bulunmalı ve adetinin 1den fazla olup olmadıgı kontrol edilmeli
        const found = basket.find((i) => i.id === decrease_id)
        //* 2)Miktarı 1den fazlaysa azalt

        if (found.amount > 1) {
            //* 2a) Elemanın Güncel Nesnesini Tut 
            const updated = { ...found, amount: found.amount - 1 }
            //* 2b) Diziye Elemanın Güncel Nesnesini ekle 
            const newBasket = basket.map((i) => (i.id === updated.id ? updated : i))
            //* 2c)State Güncelle

            setBasket(newBasket)
            toast.info("Ürünler Azaltıldı")
        }
        else {
            //* 3) Mktarı 1 ise ürünü kaldır
            removeFromBasket(decrease_id)

        }


    }

    //! c) Sağlayıcı fonksiyonları mutlaka Providerı Return etmeli ve sarmalamalı biz bunu HOC ile yaptık
    return (
        <BasketContext.Provider value={{ removeFromBasket, addToBasket, decreaseAmoount, basket }}>
            {children}
        </BasketContext.Provider>
    )
}
