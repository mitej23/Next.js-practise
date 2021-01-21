import { useState } from "react";
import jwt from "jsonwebtoken";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState<string>("You are not logged in");

  async function submitForm() {
    console.log("clickd");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((t) => t.json());

    const token = res.token;

    if (token) {
      const json = jwt.decode(token) as { [key: string]: string };
      setMessage(
        `Wekcine ${json.username} and ${
          json.admin ? "an admin" : "not an admin"
        }`
      );
    } else {
      setMessage("Something went wrong");
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <form>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="button" value="Login" onClick={submitForm} />
      </form>
    </div>
  );
}
