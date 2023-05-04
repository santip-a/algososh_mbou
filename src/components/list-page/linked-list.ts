export class Node<T> {
  data: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.data = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedList<T> {
  append: (element: T) => void
  prepend: (element: T) => void
  getArray: () => Node<T>[]
  insertAfter: (afterData: number, data: T) => void | undefined
  remove: (data: number) => void | undefined
  getSize: () => number
}

export class LinkedList<T> implements ILinkedList<T>{
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number = 0

  constructor() {
    this.head = null
    this.tail = null
  }


  append(element: T) {
    const node = new Node(element);


    if (this.tail) {
      this.tail.next = node
    }

    if (!this.head) {
      this.head = node
    }

    this.tail = node
    this.size++
  }


  prepend(element: T) {
    const node = new Node(element, this.head);
    node.next = this.head
    this.head = node

    if (!this.tail) {
      this.tail = node
    }

    this.size++
  }


  getArray() {
    const output = []
    let current = this.head

    while (current) {
      output.push(current)
      current = current.next
    }

    return output
  }


  find(number: number) {      
    if (!this.head) {
      return
    }

    if (number === 0) {
      return this.head
    }

    let current = this.head
    let index = 0

    while (current.next) {
      
      if (index === number - 1) {
        return current
      } else {
        current = current.next
      }
      index++
    }

  }

  insertAfter(number: number, data: T) {
    const elem = this.find(number)
    if (!elem) {
      return
    }

    const node = new Node(data, elem.next)
    elem.next = node
  
    this.size++
  }

  remove(number: number) {
    if (!this.head) {
      return
    }

    let current = this.head

    if (number === 0) {
      this.head = this.head.next
    }

    let index = 0

    while (current.next) {
      if (index === number - 1) {
        current.next = current.next.next
        this.tail = current
      } else {
        current = current.next
      }
      index++
    }
    this.size--
  }

  getSize() {
    return this.size;
  }

}