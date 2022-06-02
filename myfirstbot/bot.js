const Telegraf = require('telegraf');
const bot = new Telegraf('5306574811:AAHZeCkB0IrbAVSqQBLeVhFRHbMo-f9a8po');

//use
// bot.use((ctx, next) => {
//     ctx.state.apple = 5;
//     console.log(ctx);
//     ctx.reply("You used a bot");
//     next(ctx)
// })


// start

// bot.command('start', ctx => {
//     //bot.telegram.sendMessage(chatId, text, [extra])
//     bot.telegram.sendMessage(ctx.chat.id, "Hello World",
//         {
//             parse_mode: 'Markdown',
//             disable_notification: false
//         }
//     );
// })

// bot.command('start', ctx => {

// //ctx.reply(text, [extra])
//  ctx.reply("Hello!!"); // ctx method shortcuts doesn't require chat id
// //bot.telegram.sendMessage(chatId,text, [extra])
//  bot.telegram.sendMessage(ctx.chat.id, "Hello World"); //requires chat id
// })

// bot.start((ctx) => {
//     ctx.reply(ctx.state.apple)
// })


bot.start((ctx) => {
   ctx.reply('Hello!! ' + ctx.from.first_name + ', My Name is NewDevzBot. How May I be of help today?');
 })

// bot.start((ctx) => {
//     ctx.reply(ctx.from.first_name + " have entered the start command and it is a " + 
//     ctx.updateSubtypes[0])
// })

// help
bot.help((ctx) => {
    ctx.reply("Hello, What do you need help with?")
})

//settings
bot.settings((ctx) => {
    ctx.reply('You have entered the seetings command');
})

//command
bot.command(["test", "Test", "test1"], (ctx) => {
    ctx.reply("Hello World");
})

bot.hears("cat", (ctx) => {
    ctx.reply('Meow')
})

bot.on("text", (ctx) => {
    ctx.reply("This is a text message")
})

//mention method
bot.mention("botfather", (ctx) => {
    ctx.reply("mention method");
})

//handles phone numbers
bot.phone("+234 708 311 4092", (ctx) => {
    ctx.reply("Phone method")
})

//handles hashtags
bot.hashtag("hash", (ctx) => {
    ctx.reply("hashtag method")
})

bot.launch();