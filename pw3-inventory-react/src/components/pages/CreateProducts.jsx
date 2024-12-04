import style from './CreateProducts.module.css';
import Select from "../forms/Select";
import Input from "../forms/Input";
import Button from "../forms/Button";
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import api from '../../api';

const RegisterProducts = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [min_stock, setMin_stock] = useState('');
    const [price, setPrice] = useState('');
    const [categoria, setCategoria] = useState('');
    const [categories, setCategories] = useState([]);

    const toast = useToast();

    useEffect(() => {
        let mounted = true;

        api.get('/categories')
            .then(response => {
                console.log(response.data);
                if (mounted) {
                    setCategories(response.data);
                }
            })
            .catch(error => {
                console.log(error);
                if (mounted) {
                    toast({
                        title: "Erro ao encontrar as categorias.",
                        description: error.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            });

        return () => {
            mounted = false;
        };
    }, [toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();       

        if (!categoria) {
            toast({
                title: "Erro",
                description: "Por favor, selecione uma categoria.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {

            console.log(name)

            const data = {
                name: name,
                description: description,
                quantity: parseInt(quantity, 10),
                min_stock: parseInt(min_stock, 10),
                price: parseFloat(price),  // Agora o preço é corretamente um número decimal
                categoria_id: categoria,
            };
            
            console.log(data);

            const response = await api.post('/products', data);
            console.log(response);  // Adicione um log aqui para verificar a resposta

            if (response.status === 201) {
                toast({
                    title: "Produto adicionado com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                setName('');
                setDescription('');
                setQuantity('');
                setMin_stock('');
                setPrice('');
                setCategoria('');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Erro ao criar novos produtos.";
            toast({
                title: 'Erro ao criar novos produtos.',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <section className={style.register_products_container}>
            <h1>Cadastrar Produto</h1>

            <form onSubmit={handleSubmit}>

                <Input
                    type="text"
                    name="text_products"
                    text="Nome do produto"
                    placeHolder="Digite o nome do produto"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        console.log({e})
                        console.log(name)
                    }}
                />

                <Input
                    type="text"
                    name="text_description"
                    text="Descrição do produto"
                    placeHolder="Digite a descrição do produto"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                    type="number"
                    name="number_value"
                    text="Valor do produto"
                    placeHolder="Digite o valor do produto"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <Input
                    type="number"
                    name="text_quantity"
                    text="Quantidade em estoque"
                    placeHolder="Digite a quantidade"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <Input
                    type="number"
                    name="text_min_stock"
                    text="Estoque mínimo"
                    placeHolder="Digite o estoque mínimo"
                    value={min_stock}
                    onChange={(e) => setMin_stock(e.target.value)}
                />

                <Select
                    name="categoria"
                    text="Escolha uma categoria de produto"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    options={categories.map((category) => ({
                        value: category.id,
                        label: category.nome,
                    }))}
                />

                <Button rotulo="Cadastrar produto" type="submit" />
            </form>
        </section>
    );
};

export default RegisterProducts;
