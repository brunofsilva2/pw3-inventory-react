import React from "react";
import style from './CardProducts.module.css';
import Select from "../forms/Select";
import Input from "../forms/Input";
import Button from "../forms/Button";

const RegisterProducts = () => {

    return(
        <section className={style.register_products_container}>

            <h1>Cadastrar Produtos</h1>

            <Input
                type="text"
                name="text_products"
                text="Nome do produto"
                placeHolder="Digite o nome do produto"
            />

            <Input 
                type="text"
                name="text_description"
                text="Descrição do produto"
                placeHolder="Digite a descrição do produto"
            />

            <Input 
                type="number"
                name="number_value"
                text="Valor do produto"
                placeHolder="Digite o valor do produto"
            />

            <Input
                type="text"
                name="text_barcode"
                text="Código de barras"
                placeHolder="Digite o código de barras"
            />

            <Select
                name="categoria"
                text="Escolha uma categoria de produto"
            />

            <Button
                rotulo="Cadastrar produto"
            />

        </section>
    )
}

export default RegisterProducts