const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser') //import body-parser
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json()) //mengambil format dari FE menjadi json

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM mahasiswa'
  db.query(sql, (error, result) => {
    //hasil data dari mysql
    if (error) throw error
    response(200, result, 'data semua', res)
  })
  // console.log({ urlParam: req.query.name });
})

app.get('/mahasiswa', (req, res) => {
  const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim=${req.query.nim}`
  db.query(sql, (error, result) => {
    if (error) throw error
    response('200', result, 'find mahasiswa name', res)
  })
})

app.post('/mahasiswa', (req, res) => {
  const {nim, namaLengkap, kelas, alamat} = req.body //membuata variabel buat data yang ingin dimasukkan ke database
  // console.log(req.body);
  const sql = `INSERT INTO mahasiswa  (nim,nama_lengkap,kelas,alamat) VALUES (${nim},'${namaLengkap}','${kelas}','${alamat}')` // pake tanda petik satu karena nilainya varchar

  db.query(sql, (error, result) => {
    if (error) response(500, 'invalid', 'error', res) //mengatasi error
    if (result?.affectedRows) {
      //tanda ? artinya kalau result ada isinya maka akan eksekusi selajutnya dan kalau tidak maka tidak usah eksekusi
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      }
      response(200, data, 'Data add successfuly', res)
    }
  })
})

app.put('/mahasiswa', (req, res) => {
  const {nim, namaLengkap, kelas, alamat} = req.body
  const sql = `UPDATE mahasiswa SET  nama_lengkap='${namaLengkap}', kelas='${kelas}',alamat='${alamat}' WHERE nim=${nim}`

  db.query(sql, (error, result) => {
    if (error) response(500, 'invaldi', 'error', res)
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        message: result.message,
      }
      response('200', data, 'Update date successfuly', res)
    } else {
      response(404, 'user not found', 'error', res)
    }
  })
})

app.delete('/mahasiswa', (req, res) => {
  const {nim} = req.body
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`
  db.query(sql, (error, result) => {
    if (error) response(500, 'invalid', 'error', res)
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
      }
      response('200', data, 'Delete data successfuly', res)
    } else {
      response(404, 'user not found', 'error', res)
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
