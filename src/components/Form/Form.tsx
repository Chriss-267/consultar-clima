import { ChangeEvent, useState } from "react"
import { countries } from "../../data/countries"
import styles from "./Form.module.css"
import { SearchType } from "../../types"
import Alert from "../Alert/Alert"

type FormProps = {
    fetchWeather :(search: SearchType) => Promise<void>
}

function Form({fetchWeather} : FormProps) {



    const [search, setSearch] = useState<SearchType>({
        city :"",
        country : ""
    })

    const [alert, setAlert] = useState("")

    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) =>{
        setSearch(
            {
                ...search,
                [e.target.name] : e.target.value
            }
        )
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(search).includes("")){
            setAlert("Todos los campos son obligatorios")
            return
        }

        fetchWeather(search)
    }

  return (
    <form className={styles.form}
        onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input type="text"
                id="city"
                name="city"
                value={search.city}
                placeholder="Ciudad"
                onChange={handleChange}
             />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Ciudad:</label>
            <select name="country" id="country"
                 value={search.country} 
                 onChange={handleChange}
                >
                <option className={styles.select} >--Seleccione un País--</option>
                {countries.map(countries =>(
                    <option
                    className={styles.select}
                    key={countries.code}
                    value={countries.code}>{countries.name}</option>
                ))}
            </select>
            
        </div>
        <input type="submit"
                value="Consultar Clima"
                className={styles.submit}
            />

    </form>
  )
}

export default Form