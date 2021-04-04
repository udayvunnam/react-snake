class Node {
  constructor(data, next = null, prev = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

export class LinkedList {
  head = null;
  tail = null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(data) {
    if (!this.head) {
      this.head = this.tail = new Node(data);
    } else {
      const node = new Node(data, this.head);
      this.head.prev = node;
      this.head = node;
    }
  }

  removeTail() {
    let node = this.tail;
    this.tail = node.prev;
    node.prev.next = null;
    node.prev = null;
  }

  contains([row, col]) {
    let node = this.head;
    let found = false;
    while (node && !found) {
      const [currentRow, currentCol] = node.data;
      if (currentRow === row && currentCol === col) {
        found = true;
      }
      node = node.next;
    }
    return found;
  }
}
