import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import db from "../db/db.js"

const useGetProduct = (idProduct) => {
    
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    const getProduct = async() => {
        try {
            const docRef = doc(db, "products", idProduct)
            const dataDb = await getDoc(docRef)

            if(dataDb.exists()){
                const data = { id: dataDb.id, ...dataDb.data() }
                setProduct(data)
            }
            else{
                setProduct(null)
            }

            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return {product, loading}
}

export default useGetProduct