const request = require("supertest");
const server = require("../index"); //selecciona mi servidor

describe("Operaciones CRUD de cafes", () => {
    //test 1
    it('debería responder con status 200 y un arreglo con al menos un objeto', async () => {
    const response = await request(server).get('/cafes');
    expect(response.status).toBe(200); // Verifica que el estado de la respuesta sea 200
    expect(Array.isArray(response.body)).toBe(true); // Verifica que el cuerpo de la respuesta sea un arreglo
    expect(response.body.length).toBeGreaterThan(0); // Verifica que el arreglo tenga al menos un elemento
  });
    //test 2
    it('debería responder con status 404 si el id no existe', async () => {
    const idInexistente = 999;

    const response = await request(server)
      .delete(`/cafes/${idInexistente}`)
      .set('Authorization', 'fake-jwt-token'); //necesita un token para eliminar un cafe o da error 400

    expect(response.status).toBe(404);
  });
  //test3
  it('debería agregar un nuevo café y responder con status 201', async () => {
    const nuevoCafe = {
      id: 85, //id ficticio para la prueba
      nombre: 'Café de prueba'
    };

    const response = await request(server)
      .post('/cafes')
      .send(nuevoCafe) //envia el objeto
      .set('Content-Type', 'application/json'); //indica que el contenido es JSON o da error 400
       expect(response.status).toBe(201); // Verifica que el estado de la respuesta sea 201
    });
    //test4

    it('debería responder con status 400 si el id de la URL es distinto al del body', async () => {
    const idURL = 1; // ID en la URL
    const idDistinto = {
      id: 2, // ID diferente al de la URL
      nombre: 'Café actualizado'
    };

    const response = await request(server)
      .put(`/cafes/${idURL}`) // URL con id 1
      .send(idDistinto) // Body con id 2
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400); // Verifica que el estado de la respuesta sea 400
  });
});