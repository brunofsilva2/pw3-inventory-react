import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import style from './ListProducts.module.css';
import api from '../../api';

const ListProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const deleteProduct = async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            
            if (response.data.success) {
                // Produto deletado com sucesso, atualiza a lista
                setProducts(products.filter(product => product.id !== id)); 
                toast({
                    title: "Produto deletado",
                    description: response.data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Erro",
                    description: response.data.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao deletar produto",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {

        let mounted = true;
        setLoading(true);

        api.get('/products')
            .then(response => {
                if (mounted) {
                    console.log(response.data); // Verifique os dados da resposta
                    setProducts(response.data);
                    setLoading(false);
                }
            })

            .catch(error => {
                console.error(error);

                const errorMessage = error.response?.data?.message || "Erro ao encontrar produtos.";

                if (mounted) {
                    toast({
                        title: "Erro ao encontrar produtos",
                        description: errorMessage,
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
                                <li key={product.id}>
                                    {product.product_name}
                                    <button onClick={() => deleteProduct(product.id)}>Deletar</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum produto encontrado.</p>
                    )}
                </>
            )}
        </section>
    );
};

export default ListProducts;