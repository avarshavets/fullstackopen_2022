import axios from 'axios'
import {useState, useEffect} from 'react'


const ListItem = ({itemValue}) => (
    <li>{itemValue}</li>
)


const Filter = ({filterText, handleFilterClick, handleFilterChange}) => (
    <div>
        find countries <input value={filterText}
                              onClick={handleFilterClick}
                              onChange={handleFilterChange}/>
    </div>
)


const Button = ({id, handleClick}) => (
    <button id={id} onClick={handleClick}>show</button>
    )


const DisplayOneCountry = ({countryObj}) => {
    const [weatherObj, setWeather] = useState('')

    // latitude and longitude of the country's capital
    const [lat, lng] = countryObj.capitalInfo.latlng

    useEffect(() => {
        const apiKey = process.env.REACT_APP_API_KEY
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`)
            .then(response => {
                setWeather(response.data)})
    }, [])
    // [lat, lng] in deps of useEffect -->
    // fetch weather json object only if lat, lng changes


    const languageKeyValuePairs = (Object.entries(countryObj.languages))
    return (
        <>
            <h2>{countryObj.name.common}</h2>
            <div>
                <div>capital {countryObj.capital[0]}</div>
                <div>area {countryObj.area}</div>
            </div>
            <h4>languages:</h4>
            <ul>
                {languageKeyValuePairs.map(pair =>
                    <ListItem key={pair[0]} itemValue={pair[1]}/>)}
            </ul>
            <img src={countryObj.flags.png} alt='flag'/>
            <h3>Weather in {countryObj.name.common}</h3>
            {/* remember:
            weatherObj will be fetched only after useEffect is executed,
            which runs after rendering the page content --> thus, there is conditional rendering */}
            {weatherObj &&
                <>
                    <div>
                        temperature {(weatherObj.main.temp - 273.15).toFixed(2)} Celsius
                    </div>
                    <img src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png`} alt='weather'/>
                    <div>wind {weatherObj.wind.speed} m/s</div>
                </>
            }
        </>
    )
}



const DisplayCountries = ({ filteredCountries, filterText, handleShowClick }) => {
    if (filteredCountries.length === 0 && filterText) {
        return <div>no match</div>
    }
    if (filteredCountries.length > 10 && filterText) {
        return (<div>Too many matches, specify another filter.</div>)
    }
    if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map(country =>
                    <p key={country.name.common}>
                        {country.name.common}<span> </span>
                        <Button id={country.name.common}
                                handleClick={handleShowClick}/>
                    </p>
                )}
            </div>
        )
    }
    if (filteredCountries.length === 1) {
        return <DisplayOneCountry countryObj={filteredCountries[0]}/>
    }
    return <></>
}


const App = () => {
    const [countries, setCountries] = useState([])
    const [filterText, setFilterText] = useState('')

    // countryToShow captures the id of a button (onClick trigger) in a paragraph,
    // which is associated with a country in a filtered list of countries
    const [countryToShow, setCountryToShow] = useState('')

    const handleFilterChange = (event) => {
        setFilterText(event.target.value)
        // reset countryToShow
        setCountryToShow('')
    }
    const handleFilterClick = (e) => {
        e.target.value = ''
    }
    const handleShowClick = (e) => {
        setCountryToShow(e.target.getAttribute('id'))
    }

    // Get data about countries via a RESTful API
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all/')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    // if countryToShow is not empty, use it as a final filter text
    // remember: using setFilterText will cause an infinite loop due to infinite re-rendering
    const finalFilterText = countryToShow ? countryToShow : filterText

    const filteredCountries = countries.filter(country =>
        country.name['common'].toLowerCase().includes(finalFilterText.toLowerCase()))

    return (
        <>
            <Filter filterText={filterText}
                    handleFilterClick={handleFilterClick}
                    handleFilterChange={handleFilterChange} />
            <DisplayCountries filteredCountries={filteredCountries}
                              filterText={finalFilterText}
                              handleShowClick={handleShowClick}/>
        </>
    )
}
export default App;