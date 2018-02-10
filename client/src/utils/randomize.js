export default {
  shuffle: function shuffleArray (array) {
    let arr = array.slice()
    const len = arr.length
    let res = []
    let id;
    let item;
    for (let i = 0; i < len; i++) {
      id = this.randomIndex(arr.length)
      item = arr.splice(id, 1)[0]
      res.push(item)
    }
    return res;
  },
  randomIndex: function randomIndex(len) {
    return Math.floor(Math.random(len))
  }
}