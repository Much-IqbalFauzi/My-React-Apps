import { useState, useEffect } from 'react'
import Pet from './Pet'

const ANIMALS = ["Bird", "Car", "Dog", "Rabbit", "Raptile"]


const SearchParams = () => {
    // const location  = "Seatle, WA"
    const [location, setLocation] = useState(String)
    const [animal, setAnimal] = useState(String)
    const [breed, setBreed] = useState(String)
    const breeds = []

    const [pets, setPets] = useState([])

    // 
    useEffect(() => {
        requestPets()
        //the array below check again whenever any change in th erray
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const result = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const json = await result.json()

        setPets(json.pets)
    }
    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location {location}
                    <input id="location" value={location} placeholder="Location" onChange={e => setLocation(e.target.value)} />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                            setAnimal(e.target.value)
                        }}
                        onBlur={(e) => {
                            setAnimal(e.target.value)
                        }}>
                            <option />
                            {ANIMALS.map((animal) => {
                                return (
                                    <option key={animal} value={animal}>
                                        {animal}
                                    </option>
                                )
                            })}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        value={breed}
                        onChange={(e) => {
                            setBreed(e.target.value)
                        }}
                        onBlur={(e) => {
                            setBreed(e.target.value)
                        }}>
                            <option />
                            {breeds.map((breed) => {
                                return (
                                    <option key={breed} value={breed}>
                                        {breed}
                                    </option>
                                )
                            })}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            {
                pets.map(pet => {
                    return (
                        <Pet 
                            name={pet.name} 
                            animal={pet.animal} 
                            breed={pet.breed} 
                            key={pet.id} 
                        />
                    )   
                })
            }
        </div>
    )
}

export default SearchParams