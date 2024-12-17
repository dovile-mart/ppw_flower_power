import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

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
    <div className="card">
      <h3 className="mb-2">All your plants:</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group">
          {plants.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.name}, watering freq. {item.water} days
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlantList;
