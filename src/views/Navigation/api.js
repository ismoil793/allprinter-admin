import { httpGet, httpPost, httpDelete } from '../../api';

export const getAllNavigations = () => httpGet({ 
  url: '/api/admin/sidebar'
});

export const getAllLeafNavigations = () => httpGet({ 
  url: '/api/admin/sidebar?type=leaf'
});

export const getOneNavigation = (id) => httpGet({ 
  url: `/api/admin/sidebar?type=leaf&sidebar_id=${id}`
});

export const createNavigation = (data) => httpPost({ 
  url: '/api/admin/sidebar/create',
  data
});

export const deleteNavigation  = (id) => httpDelete({
  url: `/api/admin/sidebar/delete/${id}`,
});