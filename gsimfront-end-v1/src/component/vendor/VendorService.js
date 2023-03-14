import axios from 'axios';
import authHeader from '../authservices/AuthHeader';

const VENDOR_BASE_URL="http://localhost:8080/api/vendors/";
class VendorService{
    getVendors(){
        return  axios.get(VENDOR_BASE_URL,{ headers: authHeader() });
    }

    getVendorByID(id){
            return  axios.get(VENDOR_BASE_URL+id,{ headers: authHeader() });
    }

    addVendor(vendor){
        return axios.post(VENDOR_BASE_URL, vendor,{ headers: authHeader() });
    }

     deleteVendor(id){
            return axios.delete(VENDOR_BASE_URL+id,{ headers: authHeader() });
     }

      updateVendor(vendor, id){
             return axios.put(VENDOR_BASE_URL+id,vendor,{ headers: authHeader() });
      }
}
export default new VendorService();