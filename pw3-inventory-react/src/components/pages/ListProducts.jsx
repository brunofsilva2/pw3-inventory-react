import {useState, useEffect} from 'react'
import { useToast } from '@chakra-ui/react';
import style from './ListProducts.module.css';
import api from '../../api';

import * as Chakra from '@chakra-ui/react';
console.log(Chakra);


const ListProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const toast = useToast();

    useEffect(() => {

        let mounted = true;

        setLoading(true);
    
        api.get('/products')
            .then(response => {
                if(mounted) {
                    setProducts(response.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error(error);
                if(mounted) {
                    toast({
                        title: "Erro ao encontrar produtos",
                        description: error.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                    setLoading(false);
                }
            });
    
        return () => {
            mounted = false;
        };
    }, [toast]);
    
    return (
        <section className={style.list_book_container}>
            <h1>LIST PRODUCTS</h1>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {products.length > 0 ? (
                        <ul>
                            {products.map((product) => (
                                <li key={product.id}>{product.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum produto encontrado.</p>
                    )}
                </>
            )}
        </section>
    );    
}

export default ListProducts;