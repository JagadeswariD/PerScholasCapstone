import axios from 'axios';

const VENDOR_BASE_URL="http://localhost:8080/api/vendors/";
class VendorService{
    getVendors(){
        return  axios.get(VENDOR_BASE_URL);
    }

    getVendorByID(id){
            return  axios.get(VENDOR_BASE_URL+id);
    }

    addVendor(vendor){
        return axios.post(VENDOR_BASE_URL, vendor);
    }

     deleteVendor(id){
            return axios.delete(VENDOR_BASE_URL+id);
     }

      updateVendor(vendor, id){
             return axios.put(VENDOR_BASE_URL+id,vendor);
      }
}
export default new VendorService();