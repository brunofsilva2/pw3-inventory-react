import styles from './Input.module.css'



function Input({type, text, name, placeHolder, onChange}){
    return(

        <div className={styles.form_control}>

            <label htmlFor={name}> {text}</label>
            <input 
                type={type}
                name={name}
                id={name}
                placeholder={placeHolder}
                onChange={onChange}
            />


        </div>
    )


}

export default Input