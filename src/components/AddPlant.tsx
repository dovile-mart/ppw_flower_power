import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface AddPlantProps {
  userId: string;
  onPlantAdded: () => void;
}

function AddPlant({ userId, onPlantAdded }: AddPlantProps) {
  const [plantName, setPlantName] = useState('');
  const [waterFreq, setWaterFreq] = useState(0);

  const handlePlantName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlantName(e.target.value);
  };

  const handleWaterFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWaterFreq(parseFloat(e.target.value) || 0);
  };

  const addPlantToFirestore = async () => {
    if (!plantName || waterFreq <= 0) {
      alert("Error: Please fill in all fields with valid values.");
      return;
    }

    try {
      const userPlantsRef = collection(db, 'users', userId, 'Plants');
      await addDoc(userPlantsRef, {
        name: plantName,
        water: waterFreq,
      });
      setPlantName('');
      setWaterFreq(0);
      alert(`Plant ${plantName} added successfully!`);
      onPlantAdded();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error: Failed to add the plant.");
    }
  };

  return (
    <div className='card'>
      <h3>Add a new plant</h3>
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
}

export default AddPlant;
