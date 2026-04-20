/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryVehicle:
 *       type: object
 *       required:
 *         - deliveryVehicleId
 *         - supplierId
 *         - vehicleType
 *         - licensePlate
 *         - capacity
 *         - status
 *       properties:
 *         deliveryVehicleId:
 *           type: integer
 *           description: The unique identifier for the delivery vehicle
 *         supplierId:
 *           type: integer
 *           description: The ID of the supplier that owns this vehicle
 *         vehicleType:
 *           type: string
 *           description: Type of vehicle (e.g. Truck, Van, Drone)
 *         licensePlate:
 *           type: string
 *           description: Unique license plate number of the vehicle
 *         capacity:
 *           type: number
 *           format: float
 *           description: Maximum cargo weight capacity in kg
 *         status:
 *           type: string
 *           enum:
 *             - available
 *             - in-transit
 *             - maintenance
 *           description: Operational status of the vehicle
 *         lastInspectionDate:
 *           type: string
 *           description: ISO 8601 date string of the last inspection (optional)
 */
export interface DeliveryVehicle {
  deliveryVehicleId: number;
  supplierId: number;
  vehicleType: string;
  licensePlate: string;
  capacity: number;
  status: 'available' | 'in-transit' | 'maintenance';
  lastInspectionDate?: string;
}
