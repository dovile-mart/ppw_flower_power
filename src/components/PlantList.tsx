import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
interface Plant {
  name: string;
  water: number;
}

interface PlantListProps {
  userId: string;
}

const PlantList: React.FC<PlantListProps> = ({ userId }) => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchDataFromFirestore = async () => {
    try {
      console.log("Fetching data...");
      const userPlantsRef = collection(db, "users", userId, "Plants");
      const querySnapshot = await getDocs(userPlantsRef);
      const fetchedData: Plant[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as Plant;
        fetchedData.push({ name: docData.name, water: docData.water });
      });
      setPlants(fetchedData);
      console.log("Fetched plants:", fetchedData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, [userId]);

    return (
        <Box sx={{ padding: 2, marginTop: 1 }}>
            <Typography variant="h5" sx={{ marginBottom: 3 }}>All your plants:</Typography>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                    <Box>
                        <List>
                            {plants.map((item, index) => (
                                <div key={index}>
                                    <ListItem>
                                        {item.name}, watering freq. {item.water} days
                                    </ListItem>
                                    <Divider sx={{ borderBottomWidth: 1, borderColor: 'gray' }} />
                                </div>
                            ))}
                        </List>
                </Box>
            )}
        </Box>
    );
};

export default PlantList;
