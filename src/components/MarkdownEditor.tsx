"use client";

import { useCallback, useMemo } from "react";
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { MarkdownEditorProps } from "@/types";

export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
    // options for simple mde
    const options = useMemo(() => ({
        spellChecker: false,
        placeholder: "Write your post content",
        status: false,
        // toolbar: ["bold", "italic", "heading", "|", "quota", "unordered-list", "ordered-list", "|", "link"],
    }), []);

    const handleChange = useCallback((value: string) => {
        onChange(value);
    }, [onChange]);

    return <SimpleMde value={value} onChange={handleChange} options={options} />
}