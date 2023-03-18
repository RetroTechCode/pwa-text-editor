import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const textDB = await openDB('jate', 1);
  const tx = textDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ text: content });
  const result = await request;

  console.log('Successfully saved data to the database!', result);
}

export const getDb = async () => {
  const textDB = await openDB('jate', 1);
  const tx = textDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;

  console.log('result.value', result);
  return result;
};

initdb();
