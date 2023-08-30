import { openDB } from 'idb';

const initdb = async () =>
    // Create a new database called 'jate' with a key path that matches the id property of the object 
    // stored in the database
    openDB('jate', 1, {
        // Add the DB Schema if the database is created for the first time 
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            // Create an object store called 'jate' with the key path 'id' that is an integer and auto-increments
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    // Create a connection to the database version we want to use 
    const jateDb = await openDB('jate', 1);
    // Create a new transaction and specify the database to use and the permissions needed
    const tx = jateDb.transaction('jate', 'readwrite');
    // Create a new object store and specify the name and key path to use
    const store = tx.objectStore('jate');
    // Use the .add() method to add the content to the database
    const request = store.put({ id: 1, value: content });
    // Get confirmation that the content was added to the database
    await request;
};
// Added logic for a method that gets all the content from the database
export const getDb = async () => {
    // Create a connection to the database version we want to use
    const jateDb = await openDB('jate', 1);
    // Create a new transaction and specify the database to use and the permissions needed
    const tx = jateDb.transaction('jate', 'readonly');
    // Create a new object store and specify the name and key path to use
    const store = tx.objectStore('jate');
    // Use the.getAll() method to get all the content from the database
    const request = store.getAll();
    // Get confirmation that the content was added to the database
    const result = await request;
    return result.value;
};
initdb();