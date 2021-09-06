/* eslint-disable */ 
 import { CircularProgressbar } from "react-circular-progressbar";
 import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
 import { useFiles } from "../../context/file";
 import { IFile } from "../../context/file";
 
 import { Container, FileInfo, Preview } from "./styles";

 const FileList = () => {
   const { uploadedFiles: files, deleteFile} = useFiles();
 
  
   return (
    <Container>
       {files.map((uploadedFile: IFile, index:number) => (
        <li key={index}>
          <FileInfo>
           <Preview src={uploadedFile.preview} />
           <div>
           <strong>{uploadedFile.name}</strong>
               <span>
                {uploadedFile.readableSize}
                {!uploadedFile.url && (
                 <button onClick={(e) => deleteFile(uploadedFile.id)}>
                    Excluir
                 </button>
                )}
             </span>
            </div>
           </FileInfo>

           <div>
           {!uploadedFile.uploaded && !uploadedFile.error && (
               <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#ffda53" },
                 }}
                 strokeWidth={10}
                 text={String(uploadedFile.progress)}
                 value={uploadedFile.progress || 0}
             />
            )}

           {uploadedFile.url && (
              <a
                 href={uploadedFile.url}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
               </a>
             )}
 
            {uploadedFile.uploaded && (
               <MdCheckCircle size={24} color="#78e5d5" />
             )}

             {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
       ))}
    </Container>
   );
};
 
export default FileList;