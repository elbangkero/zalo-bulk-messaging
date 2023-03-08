const emulate = require('./src/emulate');



(async () => {
    await emulate.start({ showBrowser: true }).then(async () => {




        const phones = ['84855596420'
        ,'84555506618'
        ,'84755512816'
        ,'84555510663'
        ,'84955586939'
        ,'84355511290'
        ,'84555598072'
        ,'84955531112'];
        await emulate.send(phones, 'MESSAGE TEST');
        await emulate.end();
    }).catch(err =>
        console.log(err)
    );


})();