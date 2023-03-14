import axios from 'axios';
import authHeader from '../authservices/AuthHeader';
import authFileHeader from '../authservices/FileUploadHeader';

const UPLOAD_BASE_URL="http://localhost:8080/api/upload/";
class UploadService{
    getFiles(){
        return  axios.get(UPLOAD_BASE_URL,{ headers: authHeader() });
    }


    addUpload(formData,options){

        const authHeaders = authHeader();
         axios.defaults.headers.common["Authorization"] = authHeaders.Authorization;

        const headers = {
            "Authorization": authHeaders.Authorization,
          "Content-Type": "multipart/form-data",

        };
        console.log(headers);
        return axios.post(UPLOAD_BASE_URL, formData,options, {
                                                    headers: {
                                                        "Content-Type": "multipart/form-data"
                                                      }});
    }

     deleteFile(id){
            return axios.delete(UPLOAD_BASE_URL+id,{ headers: authHeader() });
     }

}
export default new UploadService();