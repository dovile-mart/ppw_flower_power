import { useState } from "react";
import VITE_API_KEY from "../config/token";

interface Species {
    id: number;
    scientific_name: string;
    family: string;
}

interface Family {
    id: number;
    name: string;
}

interface ApiResponse {
    data: Species[];
}

function SearchPlant() {
    const [family, setFamily] = useState<Family[]>([]);
    const [allPlants, setAllPlants] = useState<Species[]>([]);
    const [selectedFamily, setSelectedFamily] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    const fetchPlantsFromApi = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://trefle.io/api/v1/plants?token=${VITE_API_KEY}`);
            if (response.ok) {
                const jsonData: ApiResponse = await response.json();
                
                const families = jsonData.data.map((plant, index) => ({
                    id: index + 1,
                    name: plant.family
                }));

                const uniqueFamilies = Array.from(new Set(families.map((a) => a.name)))
                    .map((name) => families.find((a) => a.name === name));

                setFamily(uniqueFamilies as Family[]);
            } else {
                console.error('Error, response status: ', response.status);
            }
        } catch (error) {
            console.error('Error when fetching data: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPlantsByFamily = async () => {
        if (!selectedFamily) {
            console.error("Please select a family.");
            alert("Please select a family.")
            return;
        }

        setIsLoading(true);
        try {
            console.log('selectedFamily: ',selectedFamily)
            const response = await fetch(`https://trefle.io/api/v1/plants?token=${VITE_API_KEY}&filter%5Bfamily_name%5D=${selectedFamily}`);
           if (response.ok) {
                const jsonData: ApiResponse = await response.json();
                setAllPlants(jsonData.data);
            } else {
                console.error('Error, response status: ', response.status);
            }
        } catch (error) {
            console.error('Error when fetching data: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    useState(() => {
        fetchPlantsFromApi();
    }, []);

    return (
        <div>
            <h3>Plants data from Trefle</h3>
            
            <select value={selectedFamily} onChange={(e) => setSelectedFamily(e.target.value)}>
                <option value="">Select a family</option>
                {family.map((item, index) => (
                    <option key={index} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
            
            <button onClick={fetchPlantsByFamily}>
                {isLoading ? 'Loading..' : 'Fetch plants by family'}
            </button>

            <ul>
                {allPlants.map((item) => (
                    <li key={item.id}>
                        {item.scientific_name} - {item.family}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchPlant;
