const resizeImage = (event: { target: { files: [any]; }; }, setNewFileState: Function) => {
    const [imageFile] = event.target.files;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile);
        fileReader.onload = (fileReaderEvent) => {
            if (!!fileReaderEvent.target?.result) {
                const imageAsBase64 = fileReaderEvent.target.result as string;
                const image = new Image();
                image.src = imageAsBase64;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 1000; // Set your desired max width
                    const scaleFactor = maxWidth / image.width;
                    canvas.width = maxWidth;
                    canvas.height = image.height * scaleFactor;
                    const context = canvas.getContext('2d');
                    if (!!context) {
                        context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob((blob) => {
                            if (!!blob) {
                                let newFile = new File([blob], imageFile.name, { type: imageFile.type })
                                setNewFileState(newFile)
                            }
                        }, imageFile.type);
                    }
                };
            }
        };
}
export default resizeImage;