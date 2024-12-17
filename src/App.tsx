import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import { auth } from "./firebaseConfig";
import LoginForm from "./components/LoginForm";
import AddPlant from "./components/AddPlant";
import SearchPlant from "./components/SearchPlant";
import PlantList from "./components/PlantList";

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="container mt-4">
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <h2 className="mb-2">Welcome, {user.email}</h2>
          <button onClick={handleLogout} className="mb-2">
            Logout
          </button>

          <AddPlant userId={user.uid} onPlantAdded={() => {}} />

          <PlantList userId={user.uid} />

          <SearchPlant />
        </div>
      )}
    </div>
  );
}

export default App;
