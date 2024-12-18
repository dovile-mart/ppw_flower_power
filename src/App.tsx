import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";
import { auth } from "./firebaseConfig";
import LoginForm from "./components/LoginForm";
import AddPlant from "./components/AddPlant";
import SearchPlant from "./components/SearchPlant";
import PlantList from "./components/PlantList";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography, Divider } from "@mui/material";

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
    <Paper className="container mt-4">
      {!user ? (
        <LoginForm />
      ) : (
        <Box>
          <Typography variant="h4">Welcome, {user.email}</Typography>
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ display: "inline", backgroundColor: "secondary.main", position:"absolute", top:10, right:50 }}
            >Logout
            </Button>
            <Divider sx={{ borderBottomWidth: 2, borderColor: 'primary.main' }} />
            <AddPlant userId={user.uid} onPlantAdded={() => { }} />
           
            <Divider sx={{ borderBottomWidth: 2, borderColor: 'primary.main' }} />
            <PlantList userId={user.uid} />
           
            <Divider sx={{ borderBottomWidth: 2, borderColor: 'primary.main' }} />
            <SearchPlant />
        </Box>
      )}
    </Paper>
  );
}

export default App;
