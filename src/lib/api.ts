import { cookies } from 'next/headers';

// Helper para fazer requisições autenticadas no servidor
export async function getAuthHeaders() {
  // No servidor, usa cookies
  if (typeof window === 'undefined') {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }
  
  // No cliente, usa localStorage
  const token = localStorage.getItem('access_token');
  
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Fetch wrapper com autenticação
export async function authFetch(url: string, options: RequestInit = {}) {
  const headers = await getAuthHeaders();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  // Se não autorizado, redireciona para login
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.href = '/login';
    }
  }

  return response;
}
