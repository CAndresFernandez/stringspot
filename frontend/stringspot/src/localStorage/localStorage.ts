/**
 * On stocke le JWT dans le local storage au moment ou on se connecte (dans le loginThunk)
 * En arrivant sur la page (dans un useEffect du composant principal) on dispatche une action qui check si y'a un token dans le localstorage si oui : elle l'enregistre dans le'instance axios + elle demande au reducer de faire les modifs de state
 */

// Sauvegarde le JWT (Token d'accès) dans le localStorage.
export const saveJWTToLocalStorage = (jwtValue: string) => {
  localStorage.setItem("jwt", jwtValue);
};

// Récupère le JWT du localStorage.
export const getJWTFromLocalStorage = () => {
  return localStorage.getItem("jwt");
};

// Sauvegarde l'ID de l'utilisateur dans le localStorage.
export const saveUserIdToLocalStorage = (id: number) => {
  localStorage.setItem("user_id", id.toString());
};

// Récupère l'ID de l'utilisateur du localStorage.
export const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("id"); // Note: Vous pourriez vouloir changer "id" par "user_id" pour la cohérence.
};

// Sauvegarde une donnée quelconque dans le localStorage avec une clé spécifiée.
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Récupère une donnée du localStorage en utilisant une clé spécifiée.
export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key) as string;
  return JSON.parse(data);
};
