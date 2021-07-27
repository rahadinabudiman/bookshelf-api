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
   // menambahkan isi buku
    
    if (name === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          });
          response.code(400);
          return response;
    }
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          });
          response.code(400);
          return response;
    }
    books.push(SaveBooks);
    const isSuccess = books.filter((books) => books.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
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
// menampilkan semua buku
  const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  //menampilkan semua buku dari properti nama
    if (name) {
      const response = h.response({
        status: 'success',
        data: {
        books: books.filter((books) => books.name.toLowerCase().includes(name.toLowerCase())).map((books) => ({
                    id: books.id,
                    name: books.name,
                    publisher: books.publisher,
                })),
            },
          });
        response.code(200);
        return response;
    }

    // menampilkan semua buku dari properti reading
    if (reading) {
    const isReading = reading === '1';
    const response = h.response({
        status: 'success',
        data: {
            books: books.filter((books) => books.reading === isReading).map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher,
                })),
            },
          });
        response.code(200);
        return response;
    }

    // menampilkan semua buku dari properti finished
    if (finished) {
    const isFinished = finished === '1';
    const response = h.response({
        status: 'success',
        data: {
            books: books.filter((books) => books.finished === isFinished).map((books) => ({
                id: books.id,
                name: books.name,
                publisher: books.publisher,
                })),
            },
          });
        response.code(200);
        return response;
    }

    // menampilkan semua buku hanya 3 properti
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

// Menampillkan buku dari id
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

  // mengubah isi buku
  const editBooksByIdHandler = (request, h) => {
    const { id } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading,} = request.payload;
    
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((books) => books.id === id);
    if (index !== -1) {
      books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt };
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

  //delete buku berdasarkan id
  const deleteBooksByIdHandler = (request, h) => {
    const { id } = request.params;
 
    const index = books.findIndex((books) => books.id === id);
   
    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

module.exports = {addBooksHandler , getAllBooksHandler , getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler};