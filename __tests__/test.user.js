const express = require('express');
const request = require('supertest');
const base64 = require('js-base64');
const { User } = require('../src/models');
const { authRoutes } = require('../src/auth/routes');

jest.mock('../models', () => ({
  User: {
    createWithHashed: jest.fn(),
    findLoggedIn: jest.fn(),
  },
}));

describe('Auth Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(authRoutes);
  });

  describe('/signup', () => {
    it('creates a new user', async () => {
      User.createWithHashed.mockResolvedValue();

      const res = await request(app)
        .post('/signup')
        .send({ username: 'testuser', password: 'password' });

      expect(User.createWithHashed).toHaveBeenCalledWith('testuser', 'password');
      expect(res.statusCode).toBe(201);
      expect(res.text).toBe('');
    });
  });

  describe('/signin', () => {
    it('logs in a user with correct credentials', async () => {
      User.findLoggedIn.mockResolvedValue({ username: 'testuser' });

      const res = await request(app)
        .post('/signin')
        .set('Authorization', `Basic ${base64.encode('testuser:password')}`);

      expect(User.findLoggedIn).toHaveBeenCalledWith('testuser', 'password');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ username: 'testuser' });
    });

    it('returns an error with invalid authorization scheme', async () => {
      const res = await request(app)
        .post('/signin')
        .set('Authorization', 'Invalid Scheme');

      expect(res.statusCode).toBe(500);
      expect(res.text).toBe('Error: Invalid authorization scheme');
    });

    it('returns an error with invalid login', async () => {
      User.findLoggedIn.mockResolvedValue(null);

      const res = await request(app)
        .post('/signin')
        .set('Authorization', `Basic ${base64.encode('testuser:password')}`);

      expect(User.findLoggedIn).toHaveBeenCalledWith('testuser', 'password');
      expect(res.statusCode).toBe(500);
      expect(res.text).toBe('Error: Invalid login');
    });
  });
});