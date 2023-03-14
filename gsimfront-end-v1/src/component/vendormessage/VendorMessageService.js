import axios from 'axios';
import authHeader from '../authservices/AuthHeader';

const VENDOR_BASE_URL="http://localhost:8080/api/vendormessage/";
class VendorMessageService{
    getVendorMessages(){
        return  axios.get(VENDOR_BASE_URL,{ headers: authHeader() });
    }

    approveVendorMessageByID(Id){
        console.log(authHeader());
            return  axios.put(VENDOR_BASE_URL+Id,{ headers: authHeader() });
    }

    getVendorMessageByID(id){
                return  axios.get(VENDOR_BASE_URL+id,{ headers: authHeader() });
        }

    updateVendorMessage(vendorMessage, id){
             return axios.put(VENDOR_BASE_URL+id,vendorMessage,{ headers: authHeader() });
      }
   }
export default new VendorMessageService();