import axios from "axios";
import config from "../config";

async function getDataPaginated(currentPage, limit) {
  try {
   
    const response = await axios.get(
      config + `/records?page=${currentPage}&limit=${limit}`
    );

    return response;
  } catch (error) {
    console.error("Login error:", error);
  }
}

async function searchByFirstname(searchQuery) {
    try {
        
       
        const response = await axios.get( config +'/search', {
            params: { firstname: searchQuery }
          });
 
      return response;
    } catch (error) {
      console.error("search error:", error);
    }
  }
  
const my_tableService = {
  getDataPaginated,searchByFirstname
};
export default my_tableService;
