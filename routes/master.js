const {Router} = require('express')
const router = Router()
const {MasterController} = require('../app/Controller/Controller')
const {Authorization} = require('../app/Kernel')

router.get('/grade', [Authorization], MasterController.getClassGrade);
router.get('/semester', [Authorization], MasterController.getSemester);
router.get('/class-name', [Authorization], MasterController.getClassName);
router.get('/field', [Authorization], MasterController.getFieldCodeMaster);
router.get('/class-type', [Authorization], MasterController.getDataClassType);

module.exports = router;