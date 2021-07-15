const asyncHandler = require('express-async-handler')
const nodemailjet = require('node-mailjet')
const Discord = require('Discord')
const messageTemplates = require('../config/messageTemplates.json')

const addRoleToUser = asyncHandler(async (req, res) => {
  // Get the parameters
  console.log('req.body: ', req.body)
  const { userName, roleName } = req.body
  console.log(`New request received by addRoleToUser:`)
  console.log(`userName: ${ userName }`)
  console.log(`roleName: ${ roleName }`)

  const discordIntf = new Discord(environment)

  try {
    client.on('ready', async () => {

      // Get the Guild
      const guild = await client.guilds.fetch(GUILD_ID)

      // Locate the role to be assigned to the user
      const role = guild.roles.cache.find(role => role.name == roleName)
      if (role === undefined) {
        // Role not found
      }

      // Locate the user the role is to be assigned to
      const allUsers = await guild.members.fetch()
      const user = allUsers.find(member => member.user.username === userName)
      if (user === undefined) {
        // User not found
      }

      // Add the role to the user
      try {
        const guildMember = await user.add(role)
      }
      catch(err) {
        console.log(err)
        await client.destroy() // Terminate this Discord bot
        discordIntf.commandReject('fail')
      }

      // Finish processing
      discordIntf.commandResolve('done')
    })
  }
  catch(err) {
    console.log(err)
    overallProgress.stop()
    await client.destroy() // Terminate this Discord bot
    discordIntf.commandReject('fail')
  }

  // Login to Discord
  try {
    await client.login(DISCORD_TOKEN)
    return discordIntf.commandPromise
  }
  catch (err) {
    console.error(`Error logging into Discord. Token: ${ process.env.DISCORD_TOKEN }`)
    console.error(err)
    overallProgress.stop()
    discordIntf.commandReject('fail')
  }
})

exports.addRoleToUser = addRoleToUser
