export class Service {
  constructor(state, $) {
    this.state = state
    this.$ = $
  }

  /**
   * Framework
   */
  lookupService(ref) {
    return this.$.app && this.$.app[ref] ? this.$.app[ref].impl : null
  }

  up(...args) {
    return this.$.up(...args)
  }

  defer(...args) {
    return this.$.defer(...args)
  }

  emit(...args) {
    return this.$.emit(...args)
  }

  log(...args) {
    console.log(this.$.ref + ': ', ...args)
    return args[0]
  }

  /**
   * Error handling
   */

  handleError({ message = '', code = '' }) {
    // may  overriden from props
    const handler = this.lookupService('errorHandler')
    if (handler) {
      handler.handleError({ message, code, source: this.$.ref })
    } else {
      console.error(this.$.ref + ': ERROR: ', message, code)
    }
  }

  safe(p, def) {
    return p.catch(error => {
      this.handleError(error)
      return def ? def(error) : { error }
    })
  }

  onClearError() {
    return { error: null }
  }
}

export class ErrorHandlingService extends Service {
  handleError({ message = '', code, source = {} }) {
    this.show({ message: source + ': ' + message, code, mode: 'error' })
  }

  show({ message = '', code = '', source }) {
    console.error(source + ': ERROR: ', code, message)
  }
}

export class ToastService extends Service {
  onSend({ data }) {
    return {
      top: { ...data, close: () => this.emit('this.close'), closeAfter: 5 }
    }
  }

  onClose() {
    return {
      top: null
    }
  }
}

export class TestService extends Service {
  onMyClick({ clicked }) {
    return { clicked: clicked + 1 }
  }
}
