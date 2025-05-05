'use client'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/store/useAuth';

export const backend_url: string = process.env.NEXT_PUBLIC_BACKEND_URL!
const fetchAuthStatus = async () => {
  const response = await fetch(`${backend_url}/api/auth/check`, {
    method: 'GET',
  });
  return response.json();
};

export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['authStatus'],
    queryFn: fetchAuthStatus,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const authCheck = async (accessToken:string) => {
  try {
    const res = await fetch(`${backend_url}/api/v1/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      useAuth.getState().setUser(null);
    }

    const data = await res.json();
    useAuth.getState().setUser(data.user);
    // if(window.location.pathname !== '/'){
    //   window.location.href = '/';
    // }
  } catch (err) {
    console.log('errrrrr', err)
    useAuth.getState().setUser(null);
  }
}

export const createTask = async (
  url: string,
  interval: number,
  accessToken: string
) => {
  try {
    const response = await fetch(`${backend_url}/api/v1/task`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url, interval }),
    });
  
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to create task");
    }
  
    return await response.json();
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

const fetchTasks = async (accessToken: string) => {
  const response = await fetch(`${backend_url}/api/v1/task`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return await response.json();
};

export const useTasks = (accessToken: string) => {
  console.log('accessToken logging in nnnnn', accessToken)
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchTasks(accessToken),
    enabled: !!accessToken
  });
};


const fetchTaskDetails = async (id: string) => {
  try {
    const response = await fetch(`${backend_url}/api/v1/task/${id}`, {
      method: "GET",
      credentials: "include"
    });

    if (response.status === 401 || response.status === 403) {
      useAuth.getState().setUser(null);
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }

    return await response.json();

  } catch (error) {
    console.error("Error fetching task:", error);
    useAuth.getState().setUser(null);
    return null;
  }
};


export const useTaskDetails = (id: string) => {
  return useQuery({
    queryKey: ['taskDetails', id],
    queryFn: () => fetchTaskDetails(id)
  })
}