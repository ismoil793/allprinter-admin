import { httpGet, httpPost, httpDelete } from '../../api';

export const getRoles = () => httpGet({ 
  url: '/api/admin/role?type=admin'
});

export const getOneRole = (id) => httpGet({ 
  url: `/api/admin/role?type=admin&role_id=${id}`
});

export const createUpdateRole = (data) => httpPost({ 
  url: '/api/admin/role/create',
  data
});

export const deleteRole = (id) => httpDelete({
  url: `/api/admin/role/delete/${id}`,
});