import React, { Component, ReactNode } from 'react';
import { fileToBase64 } from '../functions';

interface FileFormFieldFormInterface {
    onChange: (value: any) => void;
    name: string;
    hint?: string;
    label: string;
    buttonText: string;
}

class FileFormField extends Component<FileFormFieldFormInterface> {

    public state = {
        file: ''
    };

    private readonly imagePlaceHolder = 'data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTggNTgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU4IDU4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGNsYXNzPSIiPjxnPjxnPgoJPHBhdGggZD0iTTU3LDZIMUMwLjQ0OCw2LDAsNi40NDcsMCw3djQ0YzAsMC41NTMsMC40NDgsMSwxLDFoNTZjMC41NTIsMCwxLTAuNDQ3LDEtMVY3QzU4LDYuNDQ3LDU3LjU1Miw2LDU3LDZ6IE01Niw1MEgyVjhoNTRWNTB6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMzNDM0MzQiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+Cgk8cGF0aCBkPSJNMTYsMjguMTM4YzMuMDcxLDAsNS41NjktMi40OTgsNS41NjktNS41NjhDMjEuNTY5LDE5LjQ5OCwxOS4wNzEsMTcsMTYsMTdzLTUuNTY5LDIuNDk4LTUuNTY5LDUuNTY5ICAgQzEwLjQzMSwyNS42NCwxMi45MjksMjguMTM4LDE2LDI4LjEzOHogTTE2LDE5YzEuOTY4LDAsMy41NjksMS42MDIsMy41NjksMy41NjlTMTcuOTY4LDI2LjEzOCwxNiwyNi4xMzhzLTMuNTY5LTEuNjAxLTMuNTY5LTMuNTY4ICAgUzE0LjAzMiwxOSwxNiwxOXoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgc3R5bGU9ImZpbGw6IzM0MzQzNCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiPjwvcGF0aD4KCTxwYXRoIGQ9Ik03LDQ2YzAuMjM0LDAsMC40Ny0wLjA4MiwwLjY2LTAuMjQ5bDE2LjMxMy0xNC4zNjJsMTAuMzAyLDEwLjMwMWMwLjM5MSwwLjM5MSwxLjAyMywwLjM5MSwxLjQxNCwwczAuMzkxLTEuMDIzLDAtMS40MTQgICBsLTQuODA3LTQuODA3bDkuMTgxLTEwLjA1NGwxMS4yNjEsMTAuMzIzYzAuNDA3LDAuMzczLDEuMDQsMC4zNDUsMS40MTMtMC4wNjJjMC4zNzMtMC40MDcsMC4zNDYtMS4wNC0wLjA2Mi0xLjQxM2wtMTItMTEgICBjLTAuMTk2LTAuMTc5LTAuNDU3LTAuMjY4LTAuNzItMC4yNjJjLTAuMjY1LDAuMDEyLTAuNTE1LDAuMTI5LTAuNjk0LDAuMzI1bC05Ljc5NCwxMC43MjdsLTQuNzQzLTQuNzQzICAgYy0wLjM3NC0wLjM3My0wLjk3Mi0wLjM5Mi0xLjM2OC0wLjA0NEw2LjMzOSw0NC4yNDljLTAuNDE1LDAuMzY1LTAuNDU1LDAuOTk3LTAuMDksMS40MTJDNi40NDcsNDUuODg2LDYuNzIzLDQ2LDcsNDZ6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIHN0eWxlPSJmaWxsOiMzNDM0MzQiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIj48L3BhdGg+CjwvZz48L2c+IDwvc3ZnPg==';

    private handleChange = async ({ target: { files } }): Promise<void> => {
        const file = await fileToBase64(files[0]);
        this.setState({ file });
        this.props.onChange(file);
    };

    private renderImg(file): ReactNode
    {
        return (
            <div>
                <img className="form-group-file-preview" src={file || this.imagePlaceHolder}/>
            </div>
        );
    }

    public render(): ReactNode {
        return (
            <div className="form-group form-group-file">
                <label htmlFor={this.props.name} className="bmd-label-floating mb-2">{this.props.label}</label>
                <input
                    type="file"
                    className="form-control-file"
                    id={this.props.name}
                    accept=".png,.jpg,.gif"
                    onChange={this.handleChange}
                />
                <div className="text-muted pb-2">
                    {this.renderImg(this.state.file)}
                    {this.props.hint}
                </div>
                <div>
                    <button className="btn btn-block btn-outline-primary">{this.props.buttonText}</button>
                </div>
            </div>
        );
    }
}
export default FileFormField;
