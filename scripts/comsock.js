var socketURL = "https://server1-graftax.codeanyapp.com/";
var access_token = window.localStorage.getItem("access-token");

if (access_token) {
  socket = io(socketURL);
  socket.on("loginResponse", handleLoginResponse);
  socket.on("chunkList", handleChunkList);
  socket.emit("login", access_token);
}

function handleLoginResponse(message) {
  if (message === false) {
    window.localStorage.setItem("access-token", null);
    window.location.reload(true);
    return;
  }

  socket.emit("listChunks");
}

function handleChunkList(message) {
  var chunks = chunkList.chunks;
  chunks.length = 0;

  message.forEach(function(element) {
    chunks.push({
      id: chunks.length,
      text: element
    });
  });
}