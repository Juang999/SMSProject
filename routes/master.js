const {Router} = require('express')
const router = Router()
const {MasterController} = require('../app/Controller/Controller')
const {Authorization} = require('../app/Kernel')

router.get('/grade', [Authorization], MasterController.getClassGrade);
router.get('/semester', [Authorization], MasterController.getSemester);
router.get('/location', [Authorization], MasterController.getLocation);
router.get('/class-name', [Authorization], MasterController.getClassName);
router.get('/lesson-type', [Authorization], MasterController.getLessonType);
router.get('/class-type', [Authorization], MasterController.getDataClassType);
router.get('/teacher-type', [Authorization], MasterController.getTeacherType);
router.get('/teacher-status', [Authorization], MasterController.getTeacherStatus);

module.exports = router;