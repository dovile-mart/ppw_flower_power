import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import LoginForm from './components/LoginForm';
import AddPlant from './components/AddPlant';

interface Plant {
  name: string;
  water: number;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // Get the user's UID directly from the authenticated user object
        const userId = user.uid;
        console.log("User ID:", userId); // Display the UID in the console
        fetchDataFromFirestore(userId);
      }
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Kirjautumisen ulos
      setUser(null); // Poistetaan käyttäjätilan tieto
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Download data from Firestore
  const fetchDataFromFirestore = async (userId: string) => {
    try {
      console.log('Fetching data...');
      const userPlantsRef = collection(db, "users", userId, "Plants");
      const querySnapshot = await getDocs(userPlantsRef);
      const fetchedData: Plant[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as Plant;
        fetchedData.push({ name: docData.name, water: docData.water });
      });
      console.log(fetchedData);
      setPlants(fetchedData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  return (
    <div className="container mt-4">
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <h2 className="mb-2">Welcome, {user.email}</h2>
          <button onClick={handleLogout} className="mb-2">Logout</button>
            <div className='card'>
              <AddPlant userId={user.uid} onPlantAdded={() => fetchDataFromFirestore(user.uid)} />
            </div>
          <div  className='card'>
            <h3 className="mb-2">All your plants:</h3>
            <ul className="list-group">
              {plants.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name}, watering freq. {item.water} days
              </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;