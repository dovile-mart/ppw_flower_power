import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

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
    <div className="card">
      <h3>Sign in to your account</h3>
      <form onSubmit={handleLogin} className="justify-content-between align-items-center">
        <div >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default LoginForm;