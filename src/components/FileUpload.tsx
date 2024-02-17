import React, {useEffect, useRef, useState} from 'react';

interface FileUploadProps {
    onChange?: (file: FileList | null) => void;
    accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({onChange,accept = "*"}: FileUploadProps) => {
    const [file, setFile] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []); // This effect runs only once after the component mounts

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setFile(e.dataTransfer.files);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files);
            onChange && onChange(e.target.files);
        }
    };


    return (
        <div className="card-body">
            <div
                className="btn w-full h-64 border border-dashed border-gray-400 flex flex-col items-center justify-center"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
            >
                {file && file.length > 0 ? (
                    <div>
                        <p className={"card-title"}>{`${file[0].name + (file.length > 1 ? ` 等 ${file.length} 个文件` : "")}`}</p>
                        <div className={"btn bg-primary"} onClick={() => setFile(null)}>重新选择</div>
                    </div>
                ) : (
                    <p className={"card-title"}>拖放文件到此处或点击选择文件 [自动部署] </p>
                )}
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileInputChange}
                    accept={accept}
                    ref={fileInputRef}
                />
            </div>
        </div>

    );
};

export default FileUpload;
