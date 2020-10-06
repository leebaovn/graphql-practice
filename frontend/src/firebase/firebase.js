import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCoqBUk2xnyAvDqlINX6QFL4HIr44FYs2k',
  authDomain: 'cloud-computing-5a696.firebaseapp.com',
  databaseURL: 'https://cloud-computing-5a696.firebaseio.com',
  projectId: 'cloud-computing-5a696',
  storageBucket: 'cloud-computing-5a696.appspot.com',
  messagingSenderId: '478851109834',
  appId: '1:478851109834:web:76a3492da7c716fce63533',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral
const storage = firebase.storage();
export function writePost(postId, title, content) {
  firebase
    .database()
    .ref('products/' + postId)
    .set({
      title: title,
      content: content,
    });
}
// writePost(1, 'demo realtime database', 'tim hieu realtime database');
export { storage, firebase as default };
