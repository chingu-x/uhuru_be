const DiscordJS = require('discord.js')
const asyncHandler = require('express-async-handler')
const notifyAdmin = require('./notifyAdmin.js')

const addRoleToUser = asyncHandler(async (req, res) => {
  // Get the parameters
  const { userName, roleName } = req.body
  console.log(`\nNew request received by addRoleToUser:`)
  console.log(`userName: ${ userName }`)
  console.log(`roleName: ${ roleName }`)

  const client = new DiscordJS.Client()

  try {
    client.once('ready', async () => {
      const guild = await client.guilds.fetch(`${ process.env.DISCORD_GUILD_ID }`)

      // Locate the role to be assigned to the user
      const allRoles = await guild.roles.fetch()
      const role = allRoles.cache.find(role => role.name == roleName)
      if (role == undefined) {
        await notifyAdmin('ADDROLETO_USER_ERROR', 'addRoleToUser', 
          `roleName: ${ roleName } is undefined.`)
        return res.status(500).json({ 
          message: `userName: ${ userName } roleName: ${ roleName } role is undefined.`,
          code: 500
        })
      }

      // Locate the user the role is to be assigned to
      const allUsers = await guild.members.fetch()
      const user = allUsers.find(member => member.user.username === userName)
      if (user == undefined) {
        await notifyAdmin('ADDROLETO_USER_ERROR', 'addRoleToUser', 
        `userName: ${ userName } is undefined.`)
        return res.status(500).json({ 
          message: `userName: ${ userName } roleName: ${ roleName }  user name is undefined.`,
          code: 500
        })
      }

      // Add the role to the user
      const guildMember = await user.roles.add(role)
      console.log(`Role successfully added to user`)
      return res.status(200).json({ 
        message: "Role successfully added to user",
        code: 200
      })
    })
  }
  catch(err) {
    console.log(err)
    await notifyAdmin('ADDROLETO_USER_ERROR', 'addRoleToUser', 
      `An error occurred processing userName: ${ userName } roleName: ${ roleName } err: ${ err }`)
    return res.status(500).json({ 
      message: `${ err }`,
      code: 500
    })
  }

  // Login to Discord
  try {
    await client.login(process.env.DISCORD_TOKEN)
  }
  catch (err) {
    await notifyAdmin('ADDROLETO_USER_ERROR', 'addRoleToUser', 
      `An error occurred processing userName: ${ userName } roleName: ${ roleName } err: ${ err }`)
    console.error(`Error logging into Discord. Token: ${ process.env.DISCORD_TOKEN }`)
    console.error(err)
  }
})

exports.addRoleToUser = addRoleToUser
