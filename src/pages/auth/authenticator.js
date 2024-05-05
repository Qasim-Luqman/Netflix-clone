import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'react-router-dom';

const auth = getAuth();

const isUserLoggedIn = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

export const authenticatedLoader = async () => {
  const user = await isUserLoggedIn();
  if (!user) {
    return redirect('/login');
  }
  return null;
};