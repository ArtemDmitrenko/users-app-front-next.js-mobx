import { GlobalConstants } from 'Root/constants/global';

async function getUsers<T>(url: string) {
  const fullUrl = `${GlobalConstants.BaseUrl}${url}`;
  try {
    const response = await fetch(fullUrl);
    const users: T = await response.json();
    return users;
  } catch (error: any) {
    console.log(error.message);
  }
}

export { getUsers };
