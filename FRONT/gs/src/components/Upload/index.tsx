/* eslint-disable */
import React, { FC, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFiles } from "../../context/file";

export interface IFile {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  preview: string;
  file: File | null;
  progress?: number;
  error?: boolean;
  url: string;
  }

interface IFileArray {
  teste?: IFile[];
}
 
 import { DropContainer, UploadMessage } from "./styles";
 
 const Upload: FC<IFileArray> = ({ teste }) => {
   const { handleUpload, uploadedFiles:files } = useFiles();   

   const onDrop = useCallback(
     (files) => {
      handleUpload(files);
     },
     [handleUpload]
   );

   useEffect(() => {
     if(teste){
       handleUpload(teste)
     }
   },[])
 
   const {
     getRootProps,
     getInputProps,
     isDragActive,
     isDragAccept,
     isDragReject     
   } = useDropzone({
     accept: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"],
     onDrop ,
     maxFiles:1   
   });   
   
   const renderDragMessage = useCallback(() => {
     if (!isDragActive) {
       return <UploadMessage>Arraste sua imagem até aqui...</UploadMessage>;
     }
 
     if (isDragReject) {
       return (
         <UploadMessage type="error">
           Só é possivel fazer o upload de uma imagem e nos formatos: jpeg, pjpeg , png e gif.
         </UploadMessage>
       );
     } 
     
     if(files.length >= 1) {       
      return !isDragAccept
     }    
    

    return <UploadMessage type="success">Solte a imagem aqui</UploadMessage>;
   }, [isDragActive, isDragReject]);
   return (
     <DropContainer {...getRootProps()}>
       <input {...getInputProps()} />
       {renderDragMessage()}
     </DropContainer>
   );
 }
 
 export default Upload;