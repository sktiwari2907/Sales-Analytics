import api from "../api/api.js";

export const Valueformatter = (value, format) => {
    try {
        let result;
        value = Number(value) || 0;
        if (format == 'currency') {
            result = value >= 1000000 ? Number(value/1000000).toFixed(2) + 'M' : value >= 100000 ? Number(value/1000).toFixed(2) + 'K' : value;
            result = '$' + result;
        } else if (format == 'percent') {
            result = value.toFixed(2) + '%';
        } else if (format == 'number'){
            result = value >= 1000000 ? Number(value/1000000).toFixed(2) + 'M' : value >= 100000 ? Number(value/1000).toFixed(2) + 'K' : value;
        }
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const getRoles = async () => {
  try {
    const { data } = await api("/api/user/getRoles");
    return data.roles || [];
  } catch (err) {
    console.error("Failed to fetch roles", err);
  }
};

export const getAclByRole = async () => {
    try {
        const response = await api.get("/api/user/getACL");

        const result = response.data;
        if (result.status != "success") throw Error(result.error);

        return result.data;
    } catch (error) {
        throw error;
    }
};