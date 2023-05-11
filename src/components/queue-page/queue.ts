interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: (item: T) => void;
  getHead: () => {};
  getTail: () => {};
}

export class Queue<T> implements IQueue<T> {
  private container: (T)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill("");
  }

  enqueue = (item: T) => {
    this.container[this.tail] = item;
    this.tail++;
  };

  getQueue = () => {
    return this.container.map((item, index) => {
      return {
        head: index === this.head && item || index === this.head && index + 1 === this.tail ? 'top' : '',
        value: item,
        tail: index === this.tail - 1 ? 'tail' : ''
      }
    })
  }

  getTail = () => {
    return this.tail
  }

  getHead = () => {
    return this.head
  }

  dequeue = (item: T) => {
    if (this.head + 1 === this.tail && this.tail >= 7) {
      this.container[this.head] = item;
      return true
    }
    if (this.head + 1 === this.tail) {
      return
    }
    this.container[this.head] = item;
    this.head++
  }

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.container = Array(7).fill("");
  }
}