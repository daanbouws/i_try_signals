export const signal = <T>(defaultValue: T) => {
  let _ = defaultValue
  const subscribers: Array<Function> = []

  // call all the effects and computes
  const notify = () => {
    for (let i =0; i < subscribers.length; i++) {
      subscribers[i]()
    }
  }

  const get = () => {
    return _
  }

  const set = (value: T) => {
    _ = value
    notify()
  }

  const peek = () => {
    return _
  }

  return {
    get,
    set,
    peek,
  }
}

export const effect = (fn) => {

}

export const computed = (fn) => {

}

// how to keep track of fn's that need to be ran?