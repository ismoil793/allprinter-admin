import {httpGet, httpPost, httpDelete} from '../../../api';

export const getWebSliders = () => httpGet({ 
  url: '/api/admin/slider?for=2'
});

export const getMobileSliders = () => httpGet({ 
  url: '/api/admin/slider?for=1'
});

export const getOneSLider = (id) => httpGet({
  url: `/api/admin/slider?slider_id=${id}`
})

export const createSlider = (data) => {
  let formData = new FormData();
  formData.append('type', 'simple');
  formData.append('for', data.for);
  formData.append(`image[${data.language}]`, data.banner);
  formData.append(`background[${data.language}]`, data.slider);
  formData.append('active', data.status);
  if(data.position !== undefined) {
    formData.append('position', data.position);
  }
  if(data.imageUrl !== undefined) {
    formData.append('url', data.imageUrl);
  }

  return httpPost({
    url: `/api/admin/slider/create`,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  });
};

export const updateSlider = (id, data) => {
  let formData = new FormData();
  formData.append('type', 'simple');
  if (data.banner !== undefined) {
    formData.append(`image[${data.language}]`, data.banner);
  }
  if (data.slider !== undefined) {
    formData.append(`background[${data.language}]`, data.slider);
  }
  if (data.position !== '') {
    formData.append('position', data.position);
  }
  if (data.imageUrl !== '') {
    formData.append('url', data.imageUrl);
  }
  if (data.status !== undefined) {
    formData.append('active', data.status);
  }

  return httpPost({
    url: `/api/admin/slider/update/${id}`,
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'}
  });
};

export const updateSlidersPosition = (data) => httpPost({ 
  url: '/api/admin/slider/change/position',
  data
});

export const deleteSlider = (id) => httpDelete({
  url: `/api/admin/slider/delete/${id}`,
});