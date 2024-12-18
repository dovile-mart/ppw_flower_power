import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input, Box, Typography } from "@mui/material";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in: " + user.email);
        });
    } catch (error) {
      console.error('Could not log in, error: ', error);
      alert('Could not log in, check email and password.');
    }
  };

  return (
    <Box>
      <Typography variant="h4">Sign in to your account</Typography>
      <FormControl margin="normal" onSubmit={handleLogin} className="justify-content-between align-items-center">
          <InputLabel htmlFor="email">Email:</InputLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <FormControl margin="normal">
          <InputLabel htmlFor="password">Password: </InputLabel>
          <Input
            type="password"
            id="password"
            
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={handleLogin}
          type="submit"
        >Sign in</Button>
      </FormControl>
    </Box>
  );
}

export default LoginForm;