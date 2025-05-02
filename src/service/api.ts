import { useQuery } from '@tanstack/react-query';

const backend_url : string = process.env.NEXT_PUBLIC_BACKEND_URL!
const fetchAuthStatus = async () => {
  console.log('called')
    const response = await fetch(`${backend_url}/api/auth/check`, {
        method: 'GET',
    });
    console.log(response)
    return response.json();
};

export const useAuthStatus = () => {
    return useQuery({
        queryKey:['authStatus'], 
        queryFn:fetchAuthStatus,
        retry:false,
        refetchOnWindowFocus: false
    });
};

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
  