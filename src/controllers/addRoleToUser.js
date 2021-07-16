const DiscordJS = require('discord.js')
const asyncHandler = require('express-async-handler')
const nodemailjet = require('node-mailjet')
const messageTemplates = require('../config/messageTemplates.json')

const addRoleToUser = asyncHandler(async (req, res) => {
  // Get the parameters
  const { userName, roleName } = req.body
  console.log(`\nNew request received by addRoleToUser:`)
  console.log(`userName: ${ userName }`)
  console.log(`roleName: ${ roleName }`)

  const client = new DiscordJS.Client()

  try {
    client.once('ready', async () => {
      // Get the Guild
      const guild = await client.guilds.fetch(`${ process.env.DISCORD_GUILD_ID }`)

      // Locate the role to be assigned to the user
      const allRoles = await guild.roles.fetch()
      const role = allRoles.cache.find(role => role.name == roleName)
      if (role == undefined) {
        return res.status(500).json({ 
          message: `roleName: ${ roleName } is undefined.`,
          code: 500
        })
      }

      // Locate the user the role is to be assigned to
      const allUsers = await guild.members.fetch()
      const user = allUsers.find(member => member.user.username === userName)
      if (user == undefined) {
        return res.status(500).json({ 
          message: `userName: ${ userName } is undefined.`,
          code: 500
        })
      }

      // Add the role to the user
      const guildMember = await user.roles.add(role)
      return res.status(200).json({ 
        message: "Role successfully added to user",
        code: 200
      })
    })
  }
  catch(err) {
    console.log(err)
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
    console.error(`Error logging into Discord. Token: ${ process.env.DISCORD_TOKEN }`)
    console.error(err)
  }
})

exports.addRoleToUser = addRoleToUser
