import http from "../services/axios/https";
import { auth } from "../firebase";


export default {
  // Books endpoints
  getAllBooks: async () => {
    const token = await handleTokenExpiration();
    return http.get("api/books", { headers: { Authorization: token } });
  },
  updateBook: async (id, book) => {
    const token = await handleTokenExpiration();
    return http.put("/api/books/" + id, book, { headers: { Authorization: token } });
  },
  deleteBook: async (id) => {
    const token = await handleTokenExpiration();
    return http.delete("/api/books/" + id, { headers: { Authorization: token } });
  },
  saveBook: async (id, book) => {
    const token = await handleTokenExpiration();
    return http.post("/api/books/" + id, book, { headers: { Authorization: token } });
  },
};


const handleTokenExpiration = () =>
  new Promise((resolve, reject) => {
    const user = auth.currentUser;
    if (user) {
      user
        .getIdToken()
        .then((token) => {
          resolve(token);
        })
        .catch((err) => {
          console.log("Couldn't get ID TOKEN!");
          console.log(err);
          reject();
        });
    } else {
      reject();
    }
  });