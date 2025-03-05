import { useEffect, useState } from "react";
import findRandomQuote from "../utils/findRandomQuote";
import LoadingTitle from "./LoadingTitle";
import "../styles/LoadingInfo.scss";

function LoadingInfo() {
  const [quote, setQuote] = useState<any>(null);

  useEffect(() => {
    const newQuote = findRandomQuote();
    setQuote(newQuote);
  }, []);

  if (!quote) return null;

  return (
    <div className="loading-info">
      <div>
        <LoadingTitle />
      </div>

      <div className="loading-info__quote">
        <div className="loading-info__quote-text-container">
          {quote.text.lines.map((quoteText: string) => {
            return (
              <p key={quoteText} className="loading-info__quote-text">
                {quoteText}
              </p>
            );
          })}
        </div>

        <div>
          <p className="loading-info__quote-source">- {quote.source}</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingInfo;
