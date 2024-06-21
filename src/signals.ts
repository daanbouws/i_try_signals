type Signal<T> = {
  get: () => T,
  set: (value: T) => void,
  peek: () => T,
  subscribe: (fn: any) => void
}

export const signal = <T>(defaultValue: T): Signal<T> => {
  let _ = defaultValue
  const subscribers: Array<Function> = []

  // call all the effects and computes
  const notify = () => {
    for (let i =0; i < subscribers.length; i++) {
      subscribers[i]()
    }
  }

  const get = (): T => {
    return _
  }

  const set = (value: T): void => {
    _ = value
    notify()
  }

  const peek = () => {
    return _
  }

  const subscribe = (fn: any): void => {
    subscribers.push(fn)
  }

  return {
    get,
    set,
    peek,
    subscribe,
  }
}

export const effect = (fn: any, signals: Array<Signal<any>>) => {
   signals.forEach(signal => signal.subscribe(fn))
  try {
    fn()
  } catch(e) {
    console.log(e)
  }
}

export const computed = (fn: any, signals: Array<Signal<any>>) => {

}

const testSignal = signal(100)

effect(() => {
  console.log(testSignal.get())
}, [testSignal])

testSignal.set(101)