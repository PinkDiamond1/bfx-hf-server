'use strict'

const send = require('../../../util/ws/send')
const { notifyInfo } = require('../../../util/ws/notify')

module.exports = async (server, ws, msg) => {
  const { d, db } = server
  const { Credential, Strategy, UserSettings, FavouriteTradingPairs, AlgoOrderParams } = db

  await Credential.rmAll()
  await Strategy.rmAll()
  await UserSettings.rmAll()
  await FavouriteTradingPairs.rmAll()
  await AlgoOrderParams.rmAll()

  send(ws, ['info.auth_configured', false])
  send(ws, ['info.auth_token', null])

  notifyInfo(ws, 'Cleared user credentials & data', ['clearedUserCredentialsAndData'])
  d('reset user credentials')
}
