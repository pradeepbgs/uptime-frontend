import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/store/useAuth';

export const backend_url : string = process.env.NEXT_PUBLIC_BACKEND_URL!
const fetchAuthStatus = async () => {
    const response = await fetch(`${backend_url}/api/auth/check`, {
        method: 'GET',
    });
    // console.log(response)
    return response.json();
};

export const useAuthStatus = () => {
    return useQuery({
        queryKey:['authStatus'], 
        queryFn:fetchAuthStatus,
        retry:false,
        refetchOnWindowFocus: false,
    });
};

export const authCheck = async () => {
  try {
    const res = await fetch(`${backend_url}/api/v1/auth/check`, {
      method: 'GET',
      credentials:'include'
    });
    if (!res.ok) {
      useAuth.getState().setUser(null);
    }

    const data = await res.json();
    useAuth.getState().setUser(data.user);
  } catch (err) {
    useAuth.getState().setUser(null);
  }
}

const fetchTasks = async () => {
    const response = await fetch(`${backend_url}/api/v1/task`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.json();
  };
  
  export const useTasks = () => {
    return useQuery({
        queryKey:['tasks'], 
        queryFn:fetchTasks
    });
  };
  