const {LessonController} = require('../../app/Controller/Controller.js');
const {Logging} = require('../../helper/helper.js');

test('test logging helper', async () => {
    let json = {
        "message": "hello world"
    };

    Logging.info(json);
})

test.only('test Logging exception', () => {
    LessonController.logging();
});