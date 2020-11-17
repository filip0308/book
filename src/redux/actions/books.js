import api from "../../api/index";



export const getBooks = (dispatch) => {
    return new Promise(async (resolve, reject) => {      
      try {
        const response = await api
          .getAllBooks();
        if (!response) reject();
        resolve(response.data);
        dispatch({
          type: "BOOKS",
          payload: {
              books: response.data
          }
        })
      } catch (err) {
        console.log(err)
        reject(err);
      }
    });
  };

  