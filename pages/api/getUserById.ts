import { GlobalConstants } from 'Root/constants/global';

async function getUserById<T>(url: string, userId: string) {
  const fullUrl = `${GlobalConstants.BaseUrl}${url}/${userId}`;
  try {
    const response = await fetch(fullUrl);
    const user: T = await response.json();
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
}

export { getUserById };
