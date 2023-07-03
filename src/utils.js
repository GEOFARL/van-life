import { redirect } from 'react-router-dom';

export async function requireAuth(request) {
  let isLoggedIn = localStorage.getItem('loggedIn');
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    const response = redirect(
      '/login?message=You must log in first&redirectTo=' + pathname
    );
    response.body = true;
    return response;
  }

  return null;
}
