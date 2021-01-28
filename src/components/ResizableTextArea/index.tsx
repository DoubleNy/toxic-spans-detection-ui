import React, {FormEvent, useEffect, useState} from "react";

import "./_index.scss";

type ResizableTextareaProps = {
    onChange?: any;
    className?: string;
    value?: string;
    spans?: number[];
}


const updateTextColors = (text: string, spans:number[]) => {
    const end = "</span>";
    const start = "<span style='color: red'>";

    // spans = [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 14]

    let lastSpan = spans[spans.length - 1];
    let currentSpan = lastSpan;

    for (let i = spans.length - 2; i >= 0; i--) {
        if ((spans[i + 1] - spans[i]) > 1 || i === 0) {
            currentSpan = spans[i + (i > 0 ? 1 : 0)]

            text = [text.slice(0, lastSpan + 1), end, text.slice(lastSpan + 1)].join('');
            text = [text.slice(0, currentSpan), start, text.slice(currentSpan )].join('');
            console.log(lastSpan, currentSpan);

            lastSpan = spans[i];
        }
    }

    return text;
}

const ResizableTextarea: React.FunctionComponent<ResizableTextareaProps> = (props) => {
    const [value, setValue] = useState<string>("");

    useEffect(() => {
        let el = document.getElementById("textarea");
        if (el) el.innerHTML = updateTextColors(value, props.spans ?? []);
    }, [props.spans])

    const handleChange = (event: FormEvent<HTMLDivElement>) => {
        if (event.currentTarget && event.currentTarget.textContent) {
            props.onChange(event.currentTarget.textContent);
            setValue(event.currentTarget.textContent);
        }
    };

        return (
            <p
                contentEditable={true}
                id="textarea"
                placeholder={'Enter your text here...'}
                className={`text ${props.className ?? ""}`}
                onInput={handleChange}
            />
        )
}

export default ResizableTextarea;