Vue.component('chunk-listing', {
  props: ['chunk'],
  template: '<div>{{ chunk.text }}</div>'
});

var adminApp = new Vue({
  el: '#admin-app',
  data: {
    chunks: [],
  },
  computed: {
    chunkObject: {
      get: function() {
        return editor.get();
      },
      set: function(value) {
        editor.set(value);
      }
    }
  },
  methods: {
    selectChunk: function(chunkID) {
      socket.emit("getChunk", chunkID);
    }
  }
});

// create the editor
editor = new JSONEditor(document.getElementById("json-editor"), {});