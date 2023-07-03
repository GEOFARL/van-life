import { redirect } from 'react-router-dom';

export async function requireAuth() {
  let isLoggedIn = localStorage.getItem('loggedIn');

  if (!isLoggedIn) {
    const response = redirect('/login?message=You must log in first');
    response.body = true;
    return response;
  }

  return null;
}
