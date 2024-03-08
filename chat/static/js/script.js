
let user_by = document.getElementById('sender').innerHTML
var api_get_msg = `${window.location}get-api/`
var api_get_user = `${window.location}get-user/`
var api_post_msg= `${window.location}post-api/`
let msg_div = document.getElementById("messageContainer");
let message= document.getElementById('inputMsg').value;
let to_id;
let sendMessage=document.getElementById("sendMessage");
sendMessage.style="display:none;";
function openChat(to) {
    resetBg()
  document.getElementById(`txt${to}`).style="background:aqua;border-color:aqua;"
  msg_div.innerHTML = ""
  get_sent = `${api_get_msg}${to}/${user_by}`
  get_recieved = `${api_get_msg}${user_by}/${to}`
  fetch(get_sent)
    .then(response => {
      if (!response.ok) {
        throw new Error('Chat fetching error');
      }
      return response.json();
    })
    .then(data => {
      var data = data['data']
      if (data.length >= 1) {
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          date= getDate(data[`${i}`]["at"])
          txts = data[`${i}`]["message"]
          id= data[`${i}`]["id"]
          msg_div.innerHTML += `<div class="container " id="text.1-${id}" ><p> ${txts} </p><span><p class="date">${date}</p></span></div>`
          msg_div.scrollTop = msg_div.scrollHeight;
        }
          } else console.log("No messages")
    })
    .catch(error => {
      console.error('Error:', error);
    });
    fetch(get_sent)
    .then(response => {
      if (!response.ok) {
        throw new Error('Chat fetching error');
      }
      return response.json();
    })
    .then(data => {
      var data = data['recieved']
      if (data.length >= 1) {
        console.log(data)
        for (var i = 0; i < data.length; i++) {
         date= getDate(data[`${i}`]["at"])
          txts = data[`${i}`]["message"]
          id= data[`${i}`]["id"]
          msg_div.innerHTML += `<div class="container darker" id="text.1-${id}"  ><p> ${txts}</p><span><p class="date">${date}</p></span></div>`
          msg_div.scrollTop = msg_div.scrollHeight;

        }
        sortMsg()
      } else console.log("No messages")
    })
    .catch(error => {
      console.error('Error:', error);
    });
    sendMessage.style="display:block;";

    storeTo(to);
    sessionStorage.clear()
    var ssn_to = sessionStorage.setItem('to_id', to);
  }
function resetBg() {
var friends = document.getElementsByClassName('friends');
for(i = 0; i < friends.length; i++) {
friends[i].style='background: rgb(0, 255, 136);';
}}
function getDate(dt){
var day = new Date(dt).getDate()
var hour = new Date(dt).getHours()
var mins = new Date(dt).getMinutes()
var month = new Date(dt).getMonth()
date= `On ${month}-${day} at ${hour}:${mins}`
return date
}
function sortMsg(){
var toSort = document.getElementById('messageContainer').children;
toSort = Array.prototype.slice.call(toSort, 0);

toSort.sort(function(a, b) {
var aord = +a.id.split('-')[1];
var bord = +b.id.split('-')[1];
// two elements never have the same ID hence this is sufficient:
return (aord > bord) ? 1 : -1;
});

var parent = document.getElementById('messageContainer');
parent.innerHTML = "";

for(var i = 0, l = toSort.length; i < l; i++) {
parent.appendChild(toSort[i]);
}

}

function continueChat(){
  var api_cont_msg = `${window.location}msg-api/`
  var to= parseInt(sessionStorage.getItem('to_id'));
  var get_sent = `${api_cont_msg}${to}/${user_by}`
  var get_recieved = `${api_cont_msg}${user_by}/${to}`
  fetch(get_sent)
        .then(response => {
          if (!response.ok) {
            throw new Error('Chat fetching error');
          }
          return response.json();
        })
        .then(data => {
          var data = data['data']
          if (data.length >= 1) {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
              date= getDate(data[`${i}`]["at"])
              txts = data[`${i}`]["message"]
              id= data[`${i}`]["id"]
              var element= document.getElementById(`text.1-${id}`)
              if (!element) {
                msg_div.innerHTML += `<div class="container " id="text.1-${id}" ><p> ${txts} </p><span><p class="date">${date}</p></span></div>`
                ;          msg_div.scrollTop = msg_div.scrollHeight;
              }else{console.log("No new messages")
            };
            sortMsg()
            }
            
          }console.log("No messages")
        }).catch(error => {
          console.error('Error:', error);
        });
  fetch(get_sent)
  .then(response => {
  if (!response.ok) {
  throw new Error('Chat fetching error');
  }
  return response.json();
  })
  .then(data => {
    var data = data['recieved']
    if (data.length >= 1) {
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        date= getDate(data[`${i}`]["at"])
              txts = data[`${i}`]["message"]
              id= data[`${i}`]["id"]
              var element= document.getElementById(`text.1-${id}`)
              if (!element) {
                msg_div.innerHTML += `<div class="container darker" id="text.1-${id}" ><p> ${txts} </p><span><p class="date">${date}</p></span></div>`
                ;          msg_div.scrollTop = msg_div.scrollHeight;
  }else{console.log("No new messages")
            };
            sortMsg()
    } 
  } else console.log("No messages")   
  })}


function storeTo(to){
var idMsg = document.getElementById('msgBtn');
idMsg.onclick = function(){
to_id=to;
console.log(to_id)
postMessage()
inputMsg.value="";
continueChat()
}
}
// var sk = int(sessionStorage.getItem('ssn_to'));
console.log(sessionStorage.getItem('to_id'))
var input = document.getElementById("msgBtn");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
// If the user presses the "Enter" key on the keyboard
if (event.key === "Enter") {
// Cancel the default action, if needed
event.preventDefault();
// Trigger the button element with a click
document.getElementById("msgBtn").click();
}
});
if (sessionStorage.getItem('to_id') != null){
openChat(sessionStorage.getItem('to_id'))
setInterval(continueChat,3000)
}
