import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import FormControl from '@mui/material/FormControl';
import { Box, Button, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
interface AddPlantProps {
  userId: string;
  onPlantAdded: () => void;
}

function AddPlant({ userId, onPlantAdded }: AddPlantProps) {
  const [plantName, setPlantName] = useState('');
  const [waterFreq, setWaterFreq] = useState(0);

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
    <Box sx={{padding:2, marginTop:1}}>
      <FormControl margin='normal'>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>Add a new plant</Typography>
        <TextField id="outlined-basic" label="Plant name" variant="outlined" onChange={(e) => setPlantName(e.target.value)} sx={{ marginBottom: 2 }} />
        <TextField id="outlined-basic" label="Watering frequency (days)" variant="outlined" onChange={(e) => setWaterFreq(parseFloat(e.target.value) || 0)} />
        <Button
          onClick={addPlantToFirestore}
          variant="contained"
          sx={{marginTop:3}}
        ><CheckIcon />
          Add Plant
        </Button>
      </FormControl>
    </Box>
  );
}

export default AddPlant;
