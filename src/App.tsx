import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import './App.css'
//import firebaseConfig from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebaseConfig';
import LoginForm from './components/LoginForm';
import AddPlant from './components/AddPlant';

interface Plant {
  name: string;
  water: number;
}

function App() {
  const [user, setUser] = useState<any>(null);
  const [plant, setPlant] = useState<Plant[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      fetchDataFromFirestore();
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
  const fetchDataFromFirestore = async () => {
    if (!user) return;
    try {
      console.log('Fetching data...');
      const userPlants = collection(db, "users", user.uid, "Plants")
      const querySnapshot = await getDocs(userPlants);
      const fetchedData: Plant[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as Plant;
        fetchedData.push({ name: docData.name, water: docData.water });
      });
      console.log(fetchedData)
      setPlant(fetchedData);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }

  
  useEffect(() => {
    fetchDataFromFirestore();
  }, []);


  collection(db, "Plants");


  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : (
          <div>
            <h2>Welcome, {user.email}</h2>
            <button onClick={handleLogout}>Logout</button>
            <AddPlant />
            <div>
              <h3>All your plants</h3>
              <ul>
                {plant.map((item, index) => (
                  <li key={index}>{item.name}, {item.water}</li>
                  ))}
              </ul>
          </div>
          </div>
      )
      }
    </div>
  )
}

export default App;
