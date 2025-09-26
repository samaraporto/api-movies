const request = require('supertest');
const app = require('../src/app');

describe('Testes da API de Filmes', () => {

  test('GET /api/filmes deve retornar lista de filmes', async () => {
    const res = await request(app).get('/api/filmes');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('POST /api/filmes deve adicionar um novo filme', async () => {
    const novoFilme = {
      titulo: 'Interestelar',
      diretor: 'Christopher Nolan',
      ano: 2014
    };

    const res = await request(app)
      .post('/api/filmes')
      .send(novoFilme);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Interestelar');
  });

  test('POST /api/filmes deve falhar se faltar campos', async () => {
    const res = await request(app)
      .post('/api/filmes')
      .send({ titulo: 'Sem diretor e ano' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

});
