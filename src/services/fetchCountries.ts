const API_PROVINCE = 'https://vapi.vnappmob.com';

export const fetchCities = async () => {
  try {
    const response = await fetch('https://pos.pages.fm/api/v1/geo/provinces');
    const data = await response.json();
    const transformedData = data.data.map((item: any) => ({
      label: item.name,
      value: item.id,
      province_name: item.name,
    }));
    return transformedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchDistricts = async (id: string) => {
  try {
    const response = await fetch(
      `https://pos.pages.fm/api/v1/geo/districts?province_id=${id}`
    );
    const data = await response.json();
    console.log(data);
    const transformedData = data.data.map((item: any) => ({
      label: item.name,
      value: item.id,
      district_type: item.id,
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
    const response = await fetch(
      `https://pos.pages.fm/api/v1/geo/communes?district_id=${id}`
    );
    const data = await response.json();
    const transformedData = data.data.map((item: any) => ({
      label: item.name,
      value: item.id,
      district_id: item.id,
      ward_type: item.province_id,
    }));
    return transformedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
