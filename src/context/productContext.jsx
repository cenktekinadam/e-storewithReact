import { createContext, useEffect, useState } from "react";
import api from "../utils/api";

/* 
! CONTEXT API
*UYGULAMADA  BİRDEN ÇOK BİLEŞENİN İHTİYCO OLAN VERİLERİ BİLEŞENDEN BAĞIMSIZ BİR ŞEKİLDE KONUMLANANA MERKEZLERDE YÖNETMEYE YARAR 

*CONTEXT YAPISI İÇERİSİNDE VERİLERİN STATİNİ VE VERİLERİ DEĞİŞTİRMEYE YARAYAN FONKSİYONLARI TUTABİLİR

* CONTEXT TUTTUGUMUZ STATELERİ BİLEŞENLERE DOĞRUDAN AKTARIM YAOABİLEN STATE YÖNETİM ARACIDIR
*/
//?  Context  Kullanma Aşamaları ---1---> Context Dosyası Oluşturma 

//! a) Context yapsının temelini oluşturur
export const ProductContext = createContext()

//!b) Verilerin bileşenlere aktarıcak olan sağlayıcıyı ve onun tuttugu verileri tanımlama 
export function ProductProvider({ children }) {
    const [products, setProdocts] = useState()
    const [selectedCategory, setSelectedCategory] = useState('all')


    //* Kategoriye Göre Api istegi atılıp kategori ürünleri render edildi dolayısyla urlin dinamik olması sağlandı 
    const url = selectedCategory === 'all' ? '/products' : `/products/category/${selectedCategory}`
    useEffect(() => {
        api.get(url).then((res) => setProdocts(res.data)).catch((err) => console.log(err))
    }, [selectedCategory])



    //! c) Sağlayıcı fonksiyonları mutlaka Providerı Return etmeli ve sarmalamalı biz bunu HOC ile yaptık
    return (<ProductContext.Provider value={{ products, setSelectedCategory, selectedCategory }}>{children}</ProductContext.Provider>)
}