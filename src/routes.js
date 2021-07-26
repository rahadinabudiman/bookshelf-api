const { addBooksHandler , getAllBooksHandler , getBooksByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
      },
      {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
     },
     {
        method: 'GET',
        path: '/books/{id}',
        handler: getBooksByIdHandler,
      },
  ];
   
  module.exports = routes;