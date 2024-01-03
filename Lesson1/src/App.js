import { useEffect, useState } from "react";
import "./styles.css";
export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <div class="container">
      <h1>{advice}</h1>
      <div>
        <button onClick={getAdvice}>Get Advice</button>
      </div>
      <div class="block">
        <Message count={count} />
      </div>
    </div>
  );
}
function Message(props) {
  return (
    <p>
      you have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
