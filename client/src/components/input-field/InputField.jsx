import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./InputField.styles.scss";

const InputField = (props) => {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (typeof input === "undefined") return;
    input.length < 1 || /\d/.test(input) ? setIsValid(false) : setIsValid(true);
  }, [input]);

  return (
    <div>
      <input
        type="search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={props.inputMessage}
      />
      <button
        disabled={!isValid}
        className="search-button"
        onClick={() => [props.lookUp(input), setInput("")]}
      >
        Search
      </button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {isValid ? (
          <CheckCircleIcon className="green-check-icon" />
        ) : (
          <div className="input-info-message">
            <h5>At least one character and no numbers</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
