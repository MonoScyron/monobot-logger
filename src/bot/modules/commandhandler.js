const Eris = require('eris')
const statAggregator = require('./statAggregator')

module.exports = async message => {
  if (message.author.bot || !message.member || message.channel instanceof Eris.VoiceChannel) return
  if (message.content.startsWith(process.env.GLOBAL_BOT_PREFIX)) {
    const cmd = message.content.substring(process.env.GLOBAL_BOT_PREFIX.length).split(' ')[0].toLowerCase()
    const splitSuffix = message.content.substr(process.env.GLOBAL_BOT_PREFIX).split(' ')
    const suffix = splitSuffix.slice(1, splitSuffix.length).join(' ')
    processCommand(message, cmd, suffix)
  }
}

function processCommand (message, commandName, suffix) {
  const command = global.bot.commands[commandName]
  const userId = message.author.id
  if (!command) return
  const bp = message.channel.permissionsOf(global.bot.user.id).json
  if (!bp.viewChannel || !bp.sendMessages) return
  if ((command.noDM || command.perm || command.type === 'admin') && !message.channel.guild) {
    message.channel.createMessage('You cannot use this command in a DM!')
    return
  } else if (command.noThread && (message.channel.type === 10 || message.channel.type === 11 || message.channel.type === 12)) {
    message.channel.createMessage('You cannot use this command in a thread!')
    return
  } else if (userId === process.env.CREATOR_IDS) {
    global.logger.info(`Developer override by ${message.author.username}#${message.author.discriminator} at ${new Date().toUTCString()}`)
    command.func(message, suffix)
    return
  } else if (command.type === 'creator' && !process.env.CREATOR_IDS.includes(userId)) {
    message.channel.createMessage('This command is creator only!')
    return
  } else if (command.type === 'admin' && !(message.member.permissions.has('administrator' || userId === message.channel.guild.ownerID))) {
    message.channel.createMessage('That\'s an admin only command. You need the administrator permission to use it.')
    return
  } else if (command.perm && !(message.member.permissions.has(command.perm) || userId === message.channel.guild.ownerID)) {
    message.channel.createMessage(`This command requires you to be the owner of the server, or have the ${command.perm} permission.`)
    return
  } else if (command.perms && command.perms.find(p => !message.member.permissions.has(p))) {
    message.channel.createMessage(`This command requires you to be the owner of the server, or have the following permissions: ${command.perms.join(', ')}`)
    return
  }
  global.logger.info(`${message.author.username}#${message.author.discriminator} (${userId}) in ${message.channel.id} sent ${commandName} with the args "${suffix}". The guild is called "${message.channel.guild.name}", owned by ${message.channel.guild.ownerID} and has ${message.channel.guild.memberCount} members.`)
  statAggregator.incrementCommand(command.name)

  const cooldowns = global.bot.cooldowns[commandName]
  global.logger.info(`cmdhdlr: ${commandName}`) // TODO: Delete
  global.logger.info(`cmdhdlr: ${JSON.stringify(cooldowns)}`) // TODO: Delete
  if (cooldowns) {
    if (cooldowns.has(userId)) {
      const expirationTime = cooldowns.get(userId) + command.cooldown
      if (Date.now() < expirationTime) {
        const timeLeft = (expirationTime - Date.now()) / 1000
        message.channel.createMessage(`Command "${commandName}" is on cooldown for <@${userId}>! (${timeLeft.toFixed(1)}s left)`)
        return
      }
    }
    cooldowns.set(userId, Date.now())
  }

  command.func(message, suffix)
}
