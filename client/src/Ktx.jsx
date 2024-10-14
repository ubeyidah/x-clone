import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const Ktx = ({ expression, displayMode = false }) => {
  const mathRef = React.useRef(null);

  React.useEffect(() => {
    if (mathRef.current) {
      katex.render(expression, mathRef.current, {
        throwOnError: false,
        displayMode: displayMode, // Set true for block mode
      });
    }
  }, [expression, displayMode]);

  return <span ref={mathRef}></span>;
};

export default Ktx;
