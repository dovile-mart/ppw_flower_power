import { useEffect, useState } from "react";
import API_TOKEN from "../config/token";
import FormControl from '@mui/material/FormControl';
import { Box, Button, Typography, List, ListItem, MenuItem } from "@mui/material";
import Select from '@mui/material/Select';

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
    const API_URL = 'https://trefle.io/api/v1/plants?token='
    
    const fetchPlantsFromApi = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}${API_TOKEN}`);
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
            const response = await fetch(`${API_URL}${API_TOKEN}&filter%5Bfamily_name%5D=${selectedFamily}`);
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

    useEffect(() => {
        fetchPlantsFromApi();
    }, []);

    return (
        <Box sx={{padding:2, marginTop:1}}>
            <Typography variant="h5" sx={{marginBottom:3}}>Plants data from Trefle</Typography>
            <FormControl sx={{ minWidth: 200, marginBottom: 2, marginRight:3 }} error={!selectedFamily}>
                <Select
                    native
                    value={selectedFamily}
                    displayEmpty
                    onChange={(e) => setSelectedFamily(e.target.value)}
                >
                <MenuItem value=""> <em>Select a family</em></MenuItem>
                {family.map((item, index) => (
                    <option key={index} value={item.name}>
                        {item.name}
                    </option>
                ))}
                </Select>
            </FormControl>
            
            <Button
                onClick={fetchPlantsByFamily}
                variant="contained"
            >
                {isLoading ? 'Loading..' : 'Fetch plants by family'}
            </Button>
            <Box>
                <List>
                    {allPlants.map((item) => (
                        <ListItem key={item.id}>
                            {item.scientific_name} - {item.family}
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}

export default SearchPlant;
