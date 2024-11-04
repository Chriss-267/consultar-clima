
import axios from "axios"
import { SearchType } from "../types"
import { number, object, string, InferOutput, parse } from "valibot"
import { useMemo, useState } from "react"



//Tipando con valibot
const weatherSchema = object({
    name : string(),
    main : object({
        temp : number(),
        temp_max : number(),
        temp_min : number()
    })
})

export type Weather = InferOutput<typeof weatherSchema>

const initialState = {
    name : "",
    main:{
        temp : 0,
        temp_max : 0,
        temp_min :0
    }
}
export default function useWeather(){

    const [weather, setWeather] = useState<Weather>(initialState)


    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)


    const fetchWeather = async(search : SearchType) =>{
        const token = import.meta.env.VITE_TOKEN
        setLoading(true)
        setWeather(initialState)
        setNotFound(false)
        try {
            
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search.city},${search.country}&appid=${token}`

            const {data} = await axios.get(geoUrl)
           
           
            // const lat = data[0].lat
            // const lon = data[0].lon

            // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`

            // const {data : weatherResult} = await axios.get(weatherUrl)

            const result = parse(weatherSchema, data)
            if(result){
                setWeather(result)
            }
            

        } catch (error) {
            if(error){
                setNotFound(true)
            }
            
            
        } finally{
            setLoading(false)
            
        }

    }


    const hasWeatherData = useMemo(() => weather.name, [weather])


    return{
        notFound,
        loading,
        weather,
        hasWeatherData,
        fetchWeather
    }
}