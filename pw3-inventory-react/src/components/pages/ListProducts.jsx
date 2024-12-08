import { useState, useEffect } from 'react';
import { useToast, Box, Flex, Image, Text, Button, Spinner, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input} from '@chakra-ui/react';
import api from '../../api';

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        min_stock: '',
        price: '',
        categoria_id: ''
    });
    const toast = useToast();

    const deleteProduct = async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            if (response.data.success) {
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

    const openUpdateModal = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.product_name,
            description: product.product_description,
            quantity: product.quantity,
            min_stock: product.min_stock,
            price: product.price,
            categoria_id: product.categoria_id,
        });
        setIsModalOpen(true);
    };
    

    const handleUpdate = async () => {
        try {
            const response = await api.put(`/products/${selectedProduct.id}`, formData);
            if (response.data.success) {
                setProducts(products.map(product =>
                    product.id === selectedProduct.id
                        ? { ...product, ...formData }
                        : product
                ));
                toast({
                    title: "Produto atualizado",
                    description: response.data.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setIsModalOpen(false);
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
                title: "Erro ao atualizar produto",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        api.get('/products')
            .then(response => {
                if (mounted) {
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
        <Box p={5}>
            <Heading size="lg" mb={5}>
                List Products
            </Heading>

            {loading ? (
                <Flex justify="center" align="center" height="200px">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <>
                    {products.length > 0 ? (
                        <Flex wrap="wrap" gap={5}>
                            {products.map((product) => (
                                <Box
                                    key={product.id}
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    boxShadow="md"
                                    p={4}
                                    maxW="250px"
                                    textAlign="center"
                                >
                                    <Image 
                                        src="/tarjavermelha.jpg" 
                                        alt="Tarja Vermelha" 
                                        borderRadius="md" 
                                        mb={4} 
                                        boxSize="100px" 
                                        mx="auto"
                                    />
                                    <Text fontWeight="bold" mb={2}>
                                        {product.product_name}
                                    </Text>
                                    <Flex justify="space-between" mt={4}>
                                        <Button 
                                            colorScheme="red" 
                                            size="sm" 
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Deletar
                                        </Button>
                                        <Button 
                                            colorScheme="blue" 
                                            size="sm" 
                                            onClick={() => openUpdateModal(product)}
                                        >
                                            Atualizar
                                        </Button>
                                    </Flex>
                                </Box>
                            ))}
                        </Flex>
                    ) : (
                        <Text fontSize="lg" color="gray.500" textAlign="center">
                            Nenhum produto encontrado.
                        </Text>
                    )}
                </>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Atualizar Produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            name="name"
                            placeholder="Nome"
                            value={formData.name}
                            onChange={handleInputChange}
                            mb={3}
                        />
                        <Input
                            name="description"
                            placeholder="Descrição"
                            value={formData.description}
                            onChange={handleInputChange}
                            mb={3}
                        />
                        <Input
                            name="quantity"
                            placeholder="Quantidade"
                            type="number"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            mb={3}
                        />
                        <Input
                            name="min_stock"
                            placeholder="Estoque mínimo"
                            type="number"
                            value={formData.min_stock}
                            onChange={handleInputChange}
                            mb={3}
                        />
                        <Input
                            name="price"
                            placeholder="Preço"
                            type="number"
                            value={formData.price}
                            onChange={handleInputChange}
                            mb={3}
                        />
                        <Input
                            name="categoria_id"
                            placeholder="ID da categoria"
                            type="number"
                            value={formData.categoria_id}
                            onChange={handleInputChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                            Atualizar
                        </Button>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ListProducts;
