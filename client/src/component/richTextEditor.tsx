import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  noteDescription: string;
  onChange: (value: string, delta: any, source: any, editor: any) => void;
  error: string;
}

export default function RichTextEditor({ noteDescription, onChange, error }: RichTextEditorProps) {
  return (
    <Box>
      <ReactQuill theme="snow" style={{ height: "300px" }} placeholder="Write a description here..." value={noteDescription} onChange={onChange} />
      {error && <Box style={{ color: "red" }}>{error}</Box>}
    </Box>
  );
}
