import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
/*interface AddPlantProps {
  db: Firestore;
  onAddSuccess: () => void;
}*/
function AddPlant(){
//const AddPlant: React.FC<AddPlantProps> = ({ db, onAddSuccess }) => {
  const [plantName, setPlantName] = useState('');
  const [waterFreq, setWaterFreq] = useState(0);

  const handlePlantName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantName(e.target.value);
  }
  const handleWaterFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaterFreq(parseFloat(e.target.value) || 0);
    }
    
    // Add new document to Firestore
  /*const addData = async () => {
    try {
      if (plantName && waterFreq) {
        await addDoc(collection(db, "Plants"), {
          name: plantName,
          water: waterFreq,
        });
        setPlantName("");
        setWaterFreq(0);
        fetchDataFromFirestore();
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
  const addPlantToFirestore = async () => {
    if (!plantName || !waterFreq || waterFreq <= 0) {
      alert("Error, please fill in all fields with valid values.");
      return;
    }

      try {
          if (plantName && waterFreq) {
              await addDoc(collection(db, "Plants"), {
                  name: plantName,
                  water: waterFreq,
              });
              setPlantName('');
              setWaterFreq(0);
              alert("Success. Plant added successfully!");
          }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error. Failed to add the plant.");
    }
  };
*/
const addPlantToFirestore = async () => {
  if (!plantName || waterFreq <= 0) {
    alert("Error: Please fill in all fields with valid values.");
    return;
  }

  console.log("Preparing to add plant...");
  console.log("Plant Name:", plantName, "Water Frequency:", waterFreq);

  try {
    const docRef = await addDoc(collection(db, "Plants"), {
      name: plantName,
      water: waterFreq,
    });
    console.log("Document written with ID: ", docRef.id);
    setPlantName('');
    setWaterFreq(0);
    alert("Plant added successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error: Failed to add the plant.");
  }
};

  return (
    <div>
      <h2>Add a New Plant to Firebase database</h2>
          <input
              type='text'
              value={plantName}
              onChange={handlePlantName}
              placeholder="Plant name"
          />
          <input
              type='number'
              value={waterFreq}
              onChange={handleWaterFrequency}
              placeholder="Watering frequency (days)"
          />
          <button onClick={addPlantToFirestore}>Add Plant</button>
          
    </div>
  );
};

export default AddPlant;
