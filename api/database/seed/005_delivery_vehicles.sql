-- Seed data for delivery_vehicles
-- Provides realistic delivery vehicle data referencing existing suppliers

INSERT INTO delivery_vehicles (delivery_vehicle_id, supplier_id, vehicle_type, license_plate, capacity, status, last_inspection_date) VALUES
  (1, 1, 'Truck', 'CAT-TRK-001', 5000.0, 'available', '2025-03-15T08:00:00.000Z'),
  (2, 1, 'Van', 'CAT-VAN-001', 1500.0, 'in-transit', '2025-02-20T09:30:00.000Z'),
  (3, 2, 'Truck', 'CAT-TRK-002', 8000.0, 'maintenance', '2025-01-10T14:00:00.000Z'),
  (4, 2, 'Drone', 'CAT-DRN-001', 25.0, 'available', '2025-04-01T11:15:00.000Z'),
  (5, 3, 'Van', 'CAT-VAN-002', 2000.0, 'available', NULL);
