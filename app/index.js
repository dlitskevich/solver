import { launch } from 'arrmatura'
import commons from './commons'
import templates from './app.html'
import pages from './pages'
import resources from './res'
import { TTTStore } from './stores.js'
import { pipes } from 'ultimus'

const types = [
  ...commons,
  templates,
  ...pages,
  TTTStore
]

launch({
  template: '<App />',
  types,
  resources,
  pipes: {
    ...pipes,
    fio: (p) => p.name || p.fullName,
    now: () => Date.now(),
    kv: (x = '', e = '') => 't' + e + x,
    age: () => 34,
    wrapWithKey: (v, k, r) => ({ ...r, [k]: v }),
    inc: (x = 0) => (x + 1)
  }
})
