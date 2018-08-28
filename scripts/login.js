var accessToken = getAccessToken();
if (accessToken && getState() == window.localStorage.getItem("state")) {
  window.localStorage.setItem("access-token", accessToken);
}

if (window.localStorage.getItem("access-token")) {
  document.getElementById("login-button").style.pointerEvents = "none";
  document.getElementById("curtain").style.display = "none";
} else {
  document.getElementById("login-button").href = createAuthUrl('graftax.auth0.com', createParameters());
}

function createParameters() {
  window.localStorage.setItem("state", randomString(16));
  window.localStorage.setItem("nonce", randomString(16));

  var parameters = {
    "audience": "https://admonitu.graftax.net",
    "scope": "openid",
    "response_type": "token",
    "client_id": "iASRcWXSU32TSoe21HXSJ20Fzli7UEHd",
    "redirect_uri": "https://fowadminconsole-graftax.codeanyapp.com",
    "state": window.localStorage.getItem("state"),
    "nonce": window.localStorage.getItem("nonce")
  }

  return parameters;
}

function createAuthUrl(domain, params) {

  var new_url = "https://" + domain + "/authorize?";
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      new_url += "&" + key + "=" + params[key];
    }
  }

  return new_url;
}

function randomString(length) {
  var bytes = new Uint8Array(length);
  var random = window.crypto.getRandomValues(bytes);
  var result = [];
  var charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
  random.forEach(function(c) {
    result.push(charset[c % charset.length]);
  });
  return result.join('');
}

function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getAccessToken() {
  return getParameterByName('access_token');
}

function getIdToken() {
  return getParameterByName('id_token');
}

function getState() {
  return getParameterByName('state');
}

function resetAuthToken() {
  window.localStorage.removeItem("access-token");
  window.location.reload(true);
}