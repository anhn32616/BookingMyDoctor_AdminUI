import axios from "axios";

const uploadImageApi = {
    async upload(formData) {
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dltaglcda/image/upload", formData);
            const data = response.data.url;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default uploadImageApi;
