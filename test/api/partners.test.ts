import * as assert from 'assert';
import request = require('supertest');
import app from '../../app';

describe('Partners', () => {

  describe('Get Partner', () => {

    test('response 200 if successfully get partner by id', async () => {
      const res = await request(app).get(`/api/partners/1`).expect(200);
      assert.equal(typeof res.body, 'object');
      assert.equal(res.body.organization, 'Balance at Work');
      assert.equal(res.body.customerLocations, 'across Australia, Pacific and Oceania');
    });

    test('response 400 if invalid id provided when get partner by id', async () => {
      const res = await request(app).get(`/api/partners/asda`).expect(400);
      assert.equal(typeof res.body, 'object');
      assert.equal(res.body.errors[0].status, '400');
      assert.equal(res.body.errors[0].detail, 'Invalid Partner Id');
    });
  });

  describe('Get Partners List', () => {

    test('response 200 if successfully get all partners list', async () => {
      const res = await request(app).get(`/api/partners/`).expect(200);
      assert.deepStrictEqual(Array.isArray(res.body), true);
      assert.deepStrictEqual(res.body.length, 17);
    });

    test('response 200 if successfully get specific partners list based on given range and coordinates', async () => {
      const res = await request(app).get(`/api/partners?range=10&coordinates=51.5144636,-0.142571`).expect(200);
      assert.deepStrictEqual(Array.isArray(res.body), true);
      assert.deepStrictEqual(res.body.length, 2);
    });

    test('response 400 if invalid range provided when get partners list', async () => {
      const res = await request(app).get(`/api/partners?range=&coordinates=51.5144636,-0.142571`).expect(400);
      assert.equal(typeof res.body, 'object');
      assert.equal(res.body.errors[0].status, '400');
      assert.equal(res.body.errors[0].detail, 'Invalid Range');
    });

    test('response 400 if invalid coordinates provided when get partners list', async () => {
      const res = await request(app).get(`/api/partners?range=10&coordinates=`).expect(400);
      assert.equal(typeof res.body, 'object');
      assert.equal(res.body.errors[0].status, '400');
      assert.equal(res.body.errors[0].detail, 'Invalid Coordinates');
    });
  });
});
