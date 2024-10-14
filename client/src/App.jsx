import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useState } from "react";

export default function App() {
  // Creates a new editor instance.
  const [data, setdata] = useState();

  const editor = useCreateBlockNote({
    initialContent: data || undefined,

    // Additional configuration options...
  });

  // Renders the editor instance using a React component.
  return (
    <div>
      <BlockNoteView
        editor={editor}
        onChange={() => {
          setdata(editor.document);
        }}
        theme="light"
      />
    </div>
  );
}
