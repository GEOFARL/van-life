import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAKwzBZ4Jg-djOBiHGxdGKYZyQMwnx77PA',
  authDomain: 'vanlife-d4211.firebaseapp.com',
  projectId: 'vanlife-d4211',
  storageBucket: 'vanlife-d4211.appspot.com',
  messagingSenderId: '508474840433',
  appId: '1:508474840433:web:b81e5b8c6c6de4f37712d0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, 'vans');

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id);
  const vanSnapshot = await getDoc(docRef);
  return { ...vanSnapshot.data(), id: vanSnapshot.id };
}

// export async function getVans(id) {
//   const url = id ? `/api/vans/${id}` : '/api/vans';
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: 'Failed to fetch vans',
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

// export async function getHostVans(id) {
//   const url = id ? `/api/host/vans/${id}` : '/api/host/vans';
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw {
//       message: 'Failed to fetch vans',
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await res.json();
//   return data.vans;
// }

export async function loginUser(creds) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
