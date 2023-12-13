import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
let PRroom = false
const firebaseConfig = {
  apiKey: "AIzaSyBhgzL-Y4uBpP3RAyNyM-GF2APJGoUScCw",
  authDomain: "glchat-5a6c3.firebaseapp.com",
  databaseURL: "https://glchat-5a6c3-default-rtdb.firebaseio.com",
  projectId: "glchat-5a6c3",
  storageBucket: "glchat-5a6c3.appspot.com",
  messagingSenderId: "420582896865",
  appId: "1:420582896865:web:ff6e8f5ab26d58f3bc33a0",
  measurementId: "G-59VLDR3YDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
let username = document.getElementById('username').value;
let message = document.getElementById('message').value;
function SendMessage(){

  

    const messagesRef = ref(database, 'messages');
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      username: document.getElementById('username').value ,
      message: document.getElementById('message').value ,
      timestamp: Date.now()
      });
}
function ErrMes(){
  window.alert('message can not be empty!')
}
function ErrUsername(){
  window.alert('username can not be empty!')
}
document.getElementById('sendButton').addEventListener('click', () => {
    let mes = document.getElementById('message').value
    if(mes.trim() != ""){
      if(PRroom == false){
        SendMessage()
      }

    }
    else{
      ErrMes()
    }
    console.log(mes.length)
    console.log(document.getElementById('message').value)
    console.log(mes.trim())

});

document.getElementById('message').addEventListener('keypress' , (k)=>{
  if(k.key == 'Enter'){
    
    let mes = document.getElementById('message').value
    if(mes.trim() != ""){
      if(PRroom == false){
        SendMessage()
      }

    }
    else{
      ErrMes()
    }
    console.log(mes.length)
    console.log(document.getElementById('message').value)
    console.log(mes.trim())

  }

})
// Display messages in real-time
const messagesRef = ref(database, 'messages');
onValue(messagesRef, (snapshot) => {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = ''; // Clear the messages

  snapshot.forEach((childSnapshot) => {
    const messageData = childSnapshot.val();
    const messageElement = document.createElement('p');

    messageElement.innerText = `${messageData.username}: ${messageData.message}`;
    messagesDiv.appendChild(messageElement);
  });
});

document.getElementById('gotoroom').addEventListener('click' , ()=>{
  PRroom = true
  let rId = document.getElementById('privateRoom').value
  document.getElementById('messages').style.display = 'none'
  console.log(PRroom)
  window.alert('you are in private Room #' + rId)


  const messagesRef = ref(database, 'private Rooms/' + rId + '/messages');
  onValue(messagesRef, (snapshot) => {
    document.getElementById('messages').style.display = ''
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear the messages

  snapshot.forEach((childSnapshot) => {
    const messageData = childSnapshot.val();
    const messageElement = document.createElement('p');

    messageElement.innerText = `${messageData.username}: ${messageData.message}`;
    messagesDiv.appendChild(messageElement);
  });
});
  document.getElementById('message').addEventListener('keypress' , (k)=>{
    if(k.key == 'Enter'){
      if(PRroom == true){
        //Send Message
        const messagesRef = ref(database, 'private Rooms/' + rId + '/messages');
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
          username: document.getElementById('username').value ,
          message: document.getElementById('message').value ,
          timestamp: Date.now()
          });
          }
        }
        //Send Message
  })
  document.getElementById('sendButton').addEventListener('click' , ()=>{
    if(PRroom == true){
        const messagesRef = ref(database, 'private Rooms/' + rId + '/messages');
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
          username: document.getElementById('username').value ,
          message: document.getElementById('message').value ,
          timestamp: Date.now()
          });

    }
  })
  
})
// Display of back btn #back
document.getElementById('back').addEventListener('click' , ()=>{
  console.log('button clicked #back')
  const db = getDatabase();
  const dbRef = ref(db, 'messages');

  onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      const messagesDiv = document.getElementById('messages');

      // Assuming you have an array of messages called "messageArray"
      childData.forEach((message) => {
        const messageElement = document.createElement('p');
        messageElement.innerText = message; // Assuming each message is a string
        messagesDiv.appendChild(messageElement);
      });
      // ...
    });
  }, {
  onlyOnce: true
});

})