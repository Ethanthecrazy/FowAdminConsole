Vue.component('chunk-listing', {
  props: ['chunk'],
  template: '<div>{{ chunk.text }}</div>'
})

var chunkList = new Vue({
  el: '#chunk-list',
  data: {
    chunks: [
      { id: 0, text: 'EMPTY' }
    ]
  }
});