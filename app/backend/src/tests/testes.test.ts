import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import { app } from '../app';
import users from '../database/models/users';
import teams from '../database/models/teams';
import teamService from '../database/service/teamService';
import { loginInvalido, loginValido, teamMok, teamsMok, usuarioLogado } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa as tabelas', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Testa a tabela de times', async () => {
    sinon.stub(teams, "findAll").resolves(teamsMok as teams[]);
    const times = await teamService.getAll();
    const { status } = await chai.request(app).get('/teams');
    expect(status).to.be.equal(200);
    expect(times).to.be.deep.equal(teamsMok);
  });

  it('Testa a tabela de times por ID', async () => {
    sinon.stub(teams, 'findOne').resolves(teamMok as teams);
    const { status, body } = await chai.request(app).get('/teams/2');
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(teamMok);
  });
});

describe('Testa login', () => {
  afterEach(() => sinon.restore());

  it('Testa se o retorno do login é válido', async () => {
    const resultado = await chai.request(app).post('/login').send(loginValido);
    expect(resultado.status).to.equal(200);
    expect(resultado.body).to.have.key('token');
  });

  it('Testa se o retorno do login é inválido', async () => {
    sinon.stub(users, 'findOne').resolves(usuarioLogado as users);
    const resultado = await chai.request(app).post('/login').send(loginInvalido);
    expect(resultado.status).to.be.equal(401);
    expect(resultado.body.message).to.be.equal('Invalid email or password');
  })

  it('Testa se o retorno um erro se faltar o campo de password', async () => {
    sinon.stub(users, 'findOne').resolves(null);
    const password = { email: 'teste@test.com', password: '' }
    const resultado = await chai.request(app).post('/login').send(password);
    expect(resultado.status).to.be.equal(400);
    expect(resultado.body.message).to.be.equal('All fields must be filled');
  });

  it('Testa se o retorno um erro se faltar o campo de email', async () => {
    sinon.stub(users, 'findOne').resolves(null);
    const semEmail = { email: '', password: '123456'} 
    const resultado = await chai.request(app).post('/login').send(semEmail);
    expect(resultado.status).to.be.equal(400);
    expect(resultado.body.message).to.be.equal('All fields must be filled');
  });
});