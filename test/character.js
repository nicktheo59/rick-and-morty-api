/* eslint no-unused-vars: [error, { "varsIgnorePattern": "should" }] */
/* global it, describe */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server')
const should = chai.should();

chai.use(chaiHttp);

const { message } = require('../helpers')

describe('Character Endpoints', () => {

  describe('/GET All characters', () => {
    it('it should get all characters', done => {
      chai.request(server)
        .get('/api/character')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results.length.should.be.eql(20)
          done()
        })
    })
  })

  describe('/GET Single character with id: 1', () => {
    it('it should get one character with id: 1', done => {
      chai.request(server)
        .get('/api/character/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.id.should.be.eql(1);
          done()
        })
    })
  })

  describe('/GET Single character with id: 12345', () => {
    it('it should get an error message', done => {
      chai.request(server)
        .get('/api/character/12345')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').include(message.noCharacter)
          done()
        })
    })
  })

  describe('/GET Single character with id: asdasd', () => {
    it('it should get an error message', done => {
      chai.request(server)
        .get('/api/character/asdasd')
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error').include(message.badParam)
          done()
        })
    })
  })

  describe('/GET ?name', () => {
    it('it should get characters with name: Rick', done => {
      chai.request(server)
        .get('/api/character?name=Rick')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results[0].should.have.property('name').include('Rick')
          done()
        })
    })
  })

  describe('/GET ?status', () => {
    it('it should get characters with status: Alive', done => {
      chai.request(server)
        .get('/api/character?status=alive')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results[0].should.have.property('status').include('Alive')
          done()
        })
    })
  })

  describe('/GET ?species', () => {
    it('it should get characters with status: Alien', done => {
      chai.request(server)
        .get('/api/character?species=alien')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results[0].should.have.property('species').include('Alien')
          done()
        })
    })
  })

  describe('/GET ?type', () => {
    it('it should get characters with type: Parasite', done => {
      chai.request(server)
        .get('/api/character?type=parasite')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results[0].should.have.property('type').include('Parasite')
          done()
        })
    })
  })

  describe('/GET ?gender', () => {
    it('it should get characters with gender: Female', done => {
      chai.request(server)
        .get('/api/character?gender=female')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results[0].should.have.property('gender').include('Female')
          done()
        })
    })
  })

  describe('/GET ?name, ?status, ?gender, ?species', () => {
    it('it should get characters with name: Rick, stauts: Alive, gender: Male and species: Human', done => {
      chai.request(server)
        .get('/api/character?name=Rick&status=alive&gender=Male&species=Human')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results[0].should.have.property('name').include('Rick')
          res.body.results[0].should.have.property('status').include('Alive')
          res.body.results[0].should.have.property('gender').include('Male')
          res.body.results[0].should.have.property('species').include('Human')
          done()
        })
    })
  })

  describe('/GET ?page=1', () => {
    it('it should get page: 1', done => {
      chai.request(server)
        .get('/api/character?page=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.info.prev.length.should.be.eql(0)
          res.body.results.should.be.a('array')
          res.body.results.length.should.be.eql(20)
          res.body.results[0].id.should.be.eql(1);
          res.body.results[19].id.should.be.eql(20);
          done()
        })
    })
  })

  describe('/GET ?page=2', () => {
    it('it should get page: 2', done => {
      chai.request(server)
        .get('/api/character?page=2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object')
          res.body.info.should.be.a('object')
          res.body.results.should.be.a('array')
          res.body.results.length.should.be.eql(20)
          res.body.results[0].id.should.be.eql(21);
          res.body.results[19].id.should.be.eql(40);
          done()
        })
    })
  })

  describe('/GET ?page=12345 ', () => {
    it('it should get an error message', done => {
      chai.request(server)
        .get('/api/character?page=12345')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('error').include(message.noPage)
          done()
        })
    })
  })

})
