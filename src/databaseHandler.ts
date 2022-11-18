import { openDB } from 'idb';
import { Trip } from './models/Trip';

const DB = 'TripDB3';

export async function insertTrip(tripInfo: Trip) {
  const db = await openDB(DB, 3);
  const id = await db.add('trips', tripInfo);
  return id;
}

export async function getAllTrips() {
  console.log('Get All');
  const db = await openDB(DB, 3);
  const result = await db.getAll('trips');
  return result;
}

export async function getTripById(id: number) {
  const db = await openDB(DB, 3);
  return await db.get('trips', id);
}

export async function updateTripDetail(tripInfo: Trip) {
  const db = await openDB(DB, 3);
  const id = await db.put('trips', tripInfo);
  alert('Updated trip successfully!');
  return id;
}

export async function deleteTrip(id: number) {
  const db = await openDB(DB, 3);
  const result = await db.delete('trips', id);
  alert('Deleted trip successfully!');
  return result;
}

initDB().then(() => {
  console.log('database created!');
});

async function initDB() {
  const db = await openDB(DB, 3, {
    upgrade(db) {
      const store = db.createObjectStore('trips', {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });
}
