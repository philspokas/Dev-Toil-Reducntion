import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import deliveryVehicleRouter from './deliveryVehicle';
import { runMigrations } from '../db/migrate';
import { closeDatabase, getDatabase } from '../db/sqlite';
import { errorHandler } from '../utils/errors';

let app: express.Express;

describe('DeliveryVehicle API', () => {
  beforeEach(async () => {
    await closeDatabase();
    await getDatabase(true);
    await runMigrations(true);

    app = express();
    app.use(express.json());
    app.use('/delivery-vehicles', deliveryVehicleRouter);
    app.use(errorHandler);
  });

  afterEach(async () => {
    await closeDatabase();
  });

  it('should create a new delivery vehicle', async () => {
    // First create a supplier to satisfy the foreign key
    const supplierApp = express();
    supplierApp.use(express.json());
    const { default: supplierRouter } = await import('./supplier');
    supplierApp.use('/suppliers', supplierRouter);
    supplierApp.use(errorHandler);

    const supplierResponse = await request(supplierApp).post('/suppliers').send({
      name: 'Test Supplier',
      description: 'Test',
      contactPerson: 'Jane',
      email: 'jane@test.com',
      phone: '555-0000',
      active: 1,
      verified: 1,
    });
    const supplierId = supplierResponse.body.supplierId;

    const newVehicle = {
      supplierId,
      vehicleType: 'Truck',
      licensePlate: 'TEST-001',
      capacity: 5000.0,
      status: 'available',
    };
    const response = await request(app).post('/delivery-vehicles').send(newVehicle);
    expect(response.status).toBe(201);
    expect(response.body.licensePlate).toBe('TEST-001');
    expect(response.body.vehicleType).toBe('Truck');
    expect(response.body.status).toBe('available');
    expect(response.body.deliveryVehicleId).toBeDefined();
  });

  it('should get all delivery vehicles', async () => {
    const response = await request(app).get('/delivery-vehicles');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 404 for non-existing delivery vehicle', async () => {
    const response = await request(app).get('/delivery-vehicles/999');
    expect(response.status).toBe(404);
  });

  it('should return 404 when updating non-existing delivery vehicle', async () => {
    const response = await request(app).put('/delivery-vehicles/999').send({ status: 'available' });
    expect(response.status).toBe(404);
  });

  it('should return 404 when deleting non-existing delivery vehicle', async () => {
    const response = await request(app).delete('/delivery-vehicles/999');
    expect(response.status).toBe(404);
  });

  it('should filter delivery vehicles by status', async () => {
    const response = await request(app).get('/delivery-vehicles/status/available');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    // All returned vehicles must have the requested status
    response.body.forEach((v: { status: string }) => {
      expect(v.status).toBe('available');
    });
  });
});
