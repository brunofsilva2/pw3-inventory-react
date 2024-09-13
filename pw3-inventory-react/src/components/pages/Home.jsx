import React from "react";
import style from './Home.module.css'

const Home = () => {
    return(
        <section className={style.home_container}>
            <h1>Bem vindo ao <span>InvenTory</span></h1>
            <p>Sua plataforma de cadastro, listagem e contagem de produtos!</p>
        </section>
    )
}

export default Home;