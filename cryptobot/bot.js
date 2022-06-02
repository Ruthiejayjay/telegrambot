const Telegraf = require('telegraf');
const axios = require('axios')
const bot = new Telegraf('5538736685:AAG-khuBsDowDWPbIgmyrZ55Qu7mIOsQdM4');
const apiKey = "400d4ec64114f65be2f05b8abce8415eb861c88c1e2314817ff03c1aafcd70de"

bot.command('start', ctx => {
    sendStartMessage(ctx)
})

bot.action('start', ctx => {
    ctx.deleteMessage()
    sendStartMessage(ctx)
})

function sendStartMessage(ctx) {
    let startMessage = `Welcome, this bot gives you crypto information`;
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Crypto Prices", callback_data: 'price' }
                    ],
                    [
                        { text: "CoinMarketCap", url: 'https://coinmarketcap.com' }
                    ],
                    [
                        { text: "Bot Info", callback_data: 'info' }
                    ]
                ]
            }
        })
}

bot.action('price', ctx => {
    let priceMessage = `Get Price Information. Select one of the cryptocurrencies below`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "BTC", callback_data: 'price-BTC' },
                        { text: "ETH", callback_data: 'price-ETH' }
                    ],
                    [
                        { text: "BCH", callback_data: 'price-BCH' },
                        { text: "LTC", callback_data: 'price-LTC' }
                    ],
                    [
                        { text: "Back to Menu", callback_data: 'start' },
                    ]
                ]
            }
        })
})

let priceActionList = ['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC'];
bot.action(priceActionList, async ctx => {
    let symbol = ctx.match.split('-')[1];
    //console.log(symbol)
    try{
        let res = await axios.get
        (`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apiKey}`)

        let data = res.data.DISPLAY[symbol].USD
        //console.log(data);


        let message = 
        `
        Symbol: ${symbol}
        Price: ${data.PRICE}
        Open: ${data.OPENDAY}
        High: ${data.HIGHDAY}
        Low: ${data.LOWDAY}
        Supply: ${data.SUPPLY} 
        Market Cap: ${data.MKTCAP}   
        `;
        
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Back to Prices', callback_data: 'price'}
                    ]
                ]
            }
        })
    } catch (err) {
        console.log(err);
        ctx.reply('Error Encountered')
    }
   
})

bot.action('info', ctx => {
    ctx.answerCbQuery();
    bot.telegram.sendMessage(ctx.chat.id, "Bot Info", {
        reply_markup: {
            keyboard: [
                [
                    { text: "Credits" },
                    { text: "API" },
                ],
                [
                    { text: 'Remove Keyboard' }
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        }
    })
})

bot.hears('Credits', ctx => {
    ctx.reply('This bot was made by Ruth');
});

bot.hears('API', ctx => {
    ctx.reply('This bot uses cryptocompare API');
})

bot.hears('Remove Keyboard', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Removed Keyboard", {
        reply_markup: {
            remove_keyboard: true
        }
    })
})




// bot.command('test', ctx => {
//     bot.telegram.sendMessage(ctx.chat.id, 'Welcome to cryptobot', {
//         reply_markup: {
//             inline_keyboard: [
//                 [
//                     { text: 'Click Me', callback_data: 'one' },

//                 ],
//                 // [
//                 //     { text: 'two', callback_data: 'two'}, 
//                 // ],
//                 // [
//                 //     { text: 'one', callback_data: 'one'}, 
//                 //     { text: 'one', callback_data: 'one'},
//                 //     { text: 'one', callback_data: 'one'}

//                 // ]
//             ]
//         }
//     })
// })

// bot.action('one', ctx => {
//     ctx.answerCbQuery('Hello World');
//     ctx.reply('You clicked the button');
// })

// bot.command('food', ctx => {
//     bot.telegram.sendMessage(ctx.chat.id, 'Main Menu',
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: 'See Fruits List', callback_data: 'fruits' }
//                     ],
//                     [
//                         { text: 'See Meat List', callback_data: 'meats' }
//                     ]
//                 ]
//             }
//         })
// })

// bot.action('fruits', ctx => {
//     ctx.deleteMessage();
//     bot.telegram.sendMessage(ctx.chat.id, 'List of fruits:\n- Apples\n- Oranges\n- Pears',
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: 'Back to Menu', callback_data: 'menu' }
//                     ],
//                 ]
//             }
//         })
// })

// bot.action('menu', ctx => {
//     ctx.deleteMessage();
//     bot.telegram.sendMessage(ctx.chat.id, 'Main Menu',
//         {
//             reply_markup: {
//                 inline_keyboard: [
//                     [
//                         { text: 'See Fruits List', callback_data: 'fruits' }
//                     ],
//                     [
//                         { text: 'See Meat List', callback_data: 'meats' }
//                     ]
//                 ]
//             }
//         })
// })


bot.launch();