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
    return Math.floor(Math.random() * len)
  },
  uniqueRandomIndexes: function uniqueRandomIndexes(len, amount) {
    let list = []
    let cur = 0
    let tries = 0
    while (list.length < amount && list.length < len && tries < 100) {
      cur = this.randomIndex(len)
      if (list.indexOf(cur) === -1) {
        list.push(cur)
      } else { tries++ }
    }
    return list
  }
}