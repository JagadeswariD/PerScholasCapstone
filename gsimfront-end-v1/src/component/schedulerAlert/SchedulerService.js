import axios from 'axios';
import authHeader from '../authservices/AuthHeader';

const SCHEDULER_BASE_URL="http://localhost:8080/api/producttracker/";
class SchedulerService{
    getSchedulerAlerts(){
        return  axios.get(SCHEDULER_BASE_URL,{ headers: authHeader() });
    }
 }
export default new SchedulerService();