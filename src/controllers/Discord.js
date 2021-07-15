import DiscordJS from 'discord.js'
import FileOps from './FileOps.js'

export default class Discord {
  constructor(environment) {
    this.environment = environment
    this.isDebug = this.environment.isDebug()
    this.client = new DiscordJS.Client()

    // Since extraction occurs within the `client.on` block these promises are
    // returned to the extract/audit callers and resolved by calling 
    // `this.commandResolve()` when functions like `addRoleToUser()` 
    // have completed.
    this.commandResolve = null
    this.commandReject = null
    this.commandPromise = new Promise((resolve, reject) => {
      this.commandResolve = resolve
      this.commandReject = reject
    })
  }

  getDiscordClient() {
    return this.client
  }

}