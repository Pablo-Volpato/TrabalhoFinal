/* eslint-disable */
import React, {
       createContext,
       useState,
       useEffect,
       useCallback,
       useContext,
     } from "react";
import { v4 as uuidv4 } from "uuid";
import filesize from "filesize";
import api from "../config/axiosMaquina";
     
export interface IPost {
 _id: string;
 name: string;
 size: number;
 key: string;
 url: string;
}
     
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
    
interface IFileContextData {
uploadedFiles: IFile[];
deleteFile(id: string): void;
handleUpload(file: any): void;
}

type UploadProps = {
   done:Boolean;
   foto:string;
   setFoto:(foto:string) => void;   
   
}
     
const FileContext = createContext<IFileContextData>({} as IFileContextData);

const FileProvider: React.FC<UploadProps> = ({ children , done, foto, setFoto}) => {

const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

      useEffect(() => {
        return () => {
          uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
     };
     });

    const updateFile = useCallback((id, data) => {
       setUploadedFiles((state) =>
       state.map((file) => (file.id === id ? { ...file, ...data } : file))
     );
    }, []);

     const processUpload = useCallback(
            (uploadedFile: IFile) => {
            const data = new FormData();
            console.log(data);
           if (uploadedFile.file) {
              data.append("file", uploadedFile.file, uploadedFile.name);
            }
               
              api
                 .post('/foto/uploadFile', data, {
                   onUploadProgress: (progressEvent) => {
                     let progress: number = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                 );     
                   updateFile(uploadedFile.id, { progress });
                },                                
             })
                .then((response) => {    
                 updateFile(uploadedFile.id, {
                 uploaded: true,
                 id: response.data._id,
                 url: response.data.url,
              });                   
                 
                 })
                 .catch((err) => {
                     alert(`Houve um problema para fazer upload da imagem ${uploadedFile.name} no servidor `)             
                console.log(err);
    
                 updateFile(uploadedFile.id, {
                   error: true,
                 });
              });
           },        

           [updateFile]

        );
 
    const handleUpload = useCallback(
     (files: File[]) => {       
         const newUploadedFiles: IFile[] = files.map((file: File) => ({
             file,
             id: uuidv4(),
             name: file.name,
             readableSize: filesize(file.size),
             preview: URL.createObjectURL(file),
             progress: 0,
             uploaded: false,
             error: false,
             url: "",
       })); 
       console.log(files)
       files.map((each) => {
          setFoto(each.name)

       })
                    
        setUploadedFiles((state) => state.concat(newUploadedFiles));
        newUploadedFiles.forEach(processUpload);
        },

    [processUpload]

   );
    
   const deleteFile = useCallback((id: string) => {
      console.log(id)
      api.post(`foto/deleteFile?file=${foto}`);

       setUploadedFiles((state) => state.filter((file) => file.id !== id));       

    }, [foto]);
  
    return (
       <FileContext.Provider value={{ uploadedFiles, deleteFile, handleUpload }}>
         {children}
      </FileContext.Provider>
    );
  };
    
    function useFiles(): IFileContextData {
       const context = useContext(FileContext);
 
  if (!context) {
      throw new Error("useFiles must be used within FileProvider");
     }
   
    return context;
   }
    
export { FileProvider, useFiles };
