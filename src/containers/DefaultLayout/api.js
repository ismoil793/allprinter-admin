import { httpGet } from '../../api';

export const getLoggedUserData = () => httpGet({ 
  url: '/api/admin/manager/user?type=root'
});