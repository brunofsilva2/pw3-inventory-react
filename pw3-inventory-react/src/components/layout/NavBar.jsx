import { Outlet, Link } from 'react-router-dom';
import style from './NavBar.module.css';

const NavBar = () => {

    return(
    <>
        
            <nav className={style.navbar}>
                <ul className={style.list}>

                    <Link>
                    <li className={style.logo}><img className={style.logo} src='./inventory.png'/></li>
                    </Link>

                    <Link to='/'>
                    <li className={style.item}>HOME</li>
                    </Link>

                    <Link to='/register'>
                    <li className={style.item}>CADASTRAR PRODUTOS</li>
                    </Link>

                    <Link to='/list'>
                    <li className={style.item}>LISTAR PRODUTOS</li>
                    </Link>

                </ul>
            </nav>
        <Outlet/>
    </>
    )
}

export default NavBar;