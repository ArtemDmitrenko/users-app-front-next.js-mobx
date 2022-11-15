import { GlobalConstants } from 'Root/constants/global';
import { TNewUser } from 'Root/types/newUser';

async function addUser<T>(url: string, data: TNewUser) {
  const fullUrl = `${GlobalConstants.BaseUrl}${url}`;
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    const user: T = await response.json();
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
}

export { addUser };
