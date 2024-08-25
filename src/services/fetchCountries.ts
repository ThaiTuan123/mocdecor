const API_PROVINCE = "https://vapi.vnappmob.com"

export const fetchCities = async () => {
    try {
        const response = await fetch(`${API_PROVINCE}/api/province/`);
        const data = await response.json();
        const transformedData = data.results.map((item : any) => ({
            label: item.province_name,
            value: item.province_id,
            province_name: item.province_name
          }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};

export const fetchDistricts = async (id: string) => {
    try {
        const response = await fetch(`${API_PROVINCE}/api/province/district/${id}`);
        const data = await response.json();
        const transformedData = data.results.map((item : any) => ({
            label: item.district_name,
            value: item.district_id,
            district_type: item.district_type,
            province_id: item.province_id,
        }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};


export const fetchWards = async (id: string) => {
    try {
        const response = await fetch(`${API_PROVINCE}/api/province/ward/${id}`);
        const data = await response.json();
        const transformedData = data.results.map((item : any) => ({
            label: item.ward_name,
            value: item.ward_id,
            district_id: item.district_id,
            ward_type: item.ward_type,
        }));
        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};


