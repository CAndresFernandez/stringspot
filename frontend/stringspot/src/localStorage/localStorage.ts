/**
 * On stocke le JWT dans le local storage au moment ou on se connecte (dans le loginThunk)
 * En arrivant sur la page (dans un useEffect du composant principal) on dispatche une action qui check si y'a un token dans le localstorage si oui : elle l'enregistre dans le'instance axios + elle demande au reducer de faire les modifs de state
 */
// save the refresh token to local storage
export const saveRTToLocalStorage = (rtValue: string) => {
  localStorage.setItem("refresh_token", rtValue);
};

// recuperate the refresh token from local storage
export const getRTFromLocalStorage = () => {
  return localStorage.getItem("refresh_token");
};

// save user ID to local storage
export const saveUserIdToLocalStorage = (id: number) => {
  localStorage.setItem("user_id", id.toString());
};

// get user ID from local storage
export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("user_id"); // Note: Vous pourriez vouloir changer "id" par "user_id" pour la cohérence.
};

// save data to local storage, must specify key
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// grab any data from local storage by its key
export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key) as string;
  return JSON.parse(data);
};
