import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { EDITOR_API_KEY } from "../../Components/constants";

const RichTextEditor = ({
  value,
  onChange,
  height = 500,
  disabled = false,
}) => {
  return (
    <Editor
      apiKey={EDITOR_API_KEY}
      value={value}
      disabled={disabled}
      onEditorChange={(content) => onChange(content)}
      init={{
        height,
        menubar: "file edit view insert format tools table help",

        plugins: [
          "advlist",
          "anchor",
          "autolink",
          "autosave",
          "charmap",
          "code",
          "codesample",
          "directionality",
          "emoticons",
          "fullscreen",
          "help",
          "image",
          "importcss",
          "insertdatetime",
          "link",
          "lists",
          "media",
          "preview",
          "searchreplace",
          "table",
          "visualblocks",
          "visualchars",
          "wordcount",
        ],

        toolbar:
          "undo redo | styles fontsize | " +
          "bold italic underline strikethrough | " +
          "forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | " +
          "blockquote | " +
          "link image media table | " +
          "codesample code | " +
          "removeformat | " +
          "fullscreen preview",

        content_style: `
          body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 15px;
            line-height: 1.7;
            padding: 16px;
          }

          img {
            max-width: 100%;
            height: auto;
          }

          table {
            border-collapse: collapse;
            width: 100%;
          }

          table td,
          table th {
            border: 1px solid #ddd;
            padding: 8px;
          }
        `,

        branding: false,
        promotion: false,
        statusbar: true,
        resize: true,

        image_title: true,

        automatic_uploads: false,

        paste_data_images: true,

        browser_spellcheck: true,

        contextmenu: "link image table",

        placeholder: "Write your article here...",
      }}
    />
  );
};

export default RichTextEditor;
