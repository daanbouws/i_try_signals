type Signal<T> = {
  get: () => T,
  set: (value: T) => void,
  peek: () => T,
}

type EffectWrapper = {
  execute: () => void,
  dependencies: Set<any>,
}

const manager: EffectWrapper[] = []

const subscribe = (effect: EffectWrapper, subscriptions: Set<EffectWrapper>) => {
  subscriptions.add(effect)
  effect.dependencies.add(subscriptions)
}

export const signal = <T>(defaultValue: T): Signal<T> => {
  let _ = defaultValue
  const subscribers: Set<EffectWrapper> = new Set()

  // call all the effects and computes
  const notify = () => {
    for (const sub of [...subscribers]) {
      sub.execute();
    }
  }

  const get = (): T => {
    const effect = manager.at(-1)
    if (effect) {
      subscribe(effect, subscribers)
    }
    return _
  }

  const set = (value: T): void => {
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

type EffectFn = (...args: any[]) => void



export const effect = (fn: EffectFn) => {
  const execute = () => {
    manager.push(stuff)
    try {
      fn()
    } catch(e) {
      console.log(e)
    }
  }

  const stuff: EffectWrapper = {
    execute,
    dependencies: new Set()
  }

  execute()
}

// export const computed = (fn: any, signals: Array<Signal<any>>) => {

// }

const testSignal = signal(100)

effect(() => {
  console.log(testSignal.get())
})

testSignal.set(101)
