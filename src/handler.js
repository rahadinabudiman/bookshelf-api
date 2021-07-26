const { nanoid } = require("nanoid");
const books = require('./books');

const addBooksHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
   
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;
   
    const SaveBooks = {
      id,name, year, author, summary, publisher, updatedAt, insertedAt , pageCount, readPage, finished, reading
    };
   
    books.push(SaveBooks);
   
    const isSuccess = books.filter((books) => books.id === id).length > 0;
    if (name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          });
          response.code(400);
          return response;
    }
    else if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          });
          response.code(400);
          return response;
    }
    else if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          booksId: id,
        },
      });
      response.code(201);
      return response;
    }
    else{
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
    }
  };

  const getAllBooksHandler = (request, h) => {
    const response = h.response({
    status: 'success',
    data: {
        books: books.map((books) => ({
            id: books.id,
            name: books.name,
            publisher: books.publisher,
        })),
    },
    });
    response.code(200);
    return response;
  };

  const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter((n) => n.id === id)[0];
   if (book !== undefined) {
    const response = h.response({
        status: 'success',
        data: {
          book,
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  };

module.exports = {addBooksHandler , getAllBooksHandler , getBooksByIdHandler};