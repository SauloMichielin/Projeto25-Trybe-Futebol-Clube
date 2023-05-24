import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../../app';
import teams from '../models/teams';
import { teamMok, teamsMok } from './mocks/team.mock';
import { matchesMok } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a tabela de times', () => {
  before(async () => {
    sinon
      .stub(teams, "findAll")
      .resolves({
        ...teamsMok
      } as teams[]);
  });
  after(()=>{
    sinon.restore();
  })
  it('Verifica se retorna o status 200 corretamente', async () => {
    const res = await chai.request(app).get('/teams');
    expect(res.body).to.deep.equal(teamsMok);
    expect(res.status).to.equal(200);
  });
});

describe('Testa a tabela de times por ID', () => {
  before(async () => {
    sinon
      .stub(teams, "findOne")
      .resolves({
        ...teamMok
      } as teams);
  });
  after(()=>{
    sinon.restore();
  })
  it('Verifica se retorna o status 200 corretamente por ID', async () => {
    const res = await chai.request(app).get('/teams/1');
    expect(res.body).to.deep.equal(teamMok);
    expect(res.status).to.equal(200);
  });
})

describe('Testa a tabela de partidas', () => {
  before(async () => {
    sinon
      .stub(teams, "findAll")
      .resolves({
        ...matchesMok
      } as any[]);
  });
  
  after(()=>{
    sinon.restore();
  })

  it('Verifica se retorna o status 200 das partidas corretamente', async () => {
    const res = await chai.request(app).get('/matches');
    expect(res.body).to.deep.equal(matchesMok);
    expect(res.status).to.equal(200);
  });
});
