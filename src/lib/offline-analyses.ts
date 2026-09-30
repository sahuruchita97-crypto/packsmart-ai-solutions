export type PendingAnalysis = {
  id: string;
  userId: string;
  productName: string;
  inputMode: string;
  inputs: unknown;
  recommendation: unknown;
  createdAt: string;
};

const DB_NAME = 'packsmart-offline';
const STORE = 'pending-analyses';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE)) database.createObjectStore(STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function transact<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore, done: (value: T) => void) => void): Promise<T> {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, mode);
    let result: T;
    action(transaction.objectStore(STORE), value => { result = value; });
    transaction.oncomplete = () => { database.close(); resolve(result); };
    transaction.onerror = () => { database.close(); reject(transaction.error); };
    transaction.onabort = () => { database.close(); reject(transaction.error); };
  });
}

export function queueAnalysis(analysis: PendingAnalysis) {
  return transact<void>('readwrite', (store) => { store.put(analysis); });
}

export function removeQueuedAnalysis(id: string) {
  return transact<void>('readwrite', (store) => { store.delete(id); });
}

export function listQueuedAnalyses(userId: string) {
  return transact<PendingAnalysis[]>('readonly', (store, done) => {
    const request = store.getAll();
    request.onsuccess = () => done((request.result as PendingAnalysis[]).filter(item => item.userId === userId));
  });
}