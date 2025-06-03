import { useEffect, useState } from "react";
import axios from "axios";

function Market() {
  // const [symbol, setSymbol] = useState("");
  // const [quoteData, setQuoteData] = useState(null);

  return (
    <div>
      <h1>Paper Trading</h1>
      <input>
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (eg. AAPL)"
      </input>
    </div>
  );
}

export default Market;  
