import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

function RichTextEditor(props) {

    const handleChange = (content) => {
        props.setContent(content);
    }

    return (
        <div>
            <form>
                <Editor
                    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
                    value={props.content}
                    init={{
                        height: 500,
                        menubar: true
                    }}
                    onEditorChange={handleChange}
                />
                <br />
            </form>
        </div>
    );
}

export default RichTextEditor;