var socket = null;
var socketURL = "https://server1-graftax.codeanyapp.com/";
var access_token = window.localStorage.getItem("access-token");

if (access_token) {
  socket = io(socketURL);
  socket.on("loginResponse", handleLoginResponse);
  socket.on("chunkList", handleChunkList);
  socket.on("chunkData", handleChunkData);
  socket.emit("login", access_token);
}

function handleLoginResponse(message) {
  if (message === false) {
    resetAuthToken();
    return;
  }

  socket.emit("listChunks");
}

function handleChunkList(message) {
  var chunks = adminApp.chunks;
  chunks.length = 0;

  message.forEach(function(element) {
    chunks.push({
      id: chunks.length,
      text: element
    });
  });
}

function handleChunkData(message) {
  adminApp.chunkObject = message;
}