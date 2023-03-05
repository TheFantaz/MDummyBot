const armorManager = require('mineflayer-armor-manager')
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 49953,
  username: 'DummyffBot'
})

bot.loadPlugin(armorManager)

function lookAtNearestPlayer () {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)
  
  if (!playerEntity) return
  
  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}

function chatManager(username, message){
    if(message === 'health')
        bot.chat(((Math.round((bot.health/2)) * 2) / 2).toFixed(0.5))
}

var lastHealth = 10;

bot.on('physicTick', lookAtNearestPlayer)
bot.on('chat',chatManager )
bot.on('entityHurt', (entity)=>{
  if(entity != bot.entity) return;

  let num = Math.round((bot.health))/2
  bot.chat((num + " " + (lastHealth-num)))
  
  lastHealth = num;
});
bot.on("death", ()=>{
  lastHealth=10;
})