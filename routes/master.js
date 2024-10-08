const {Router} = require('express')
const router = Router()
const MasterController = require('../app/Controller/Master/MasterController')
const {Middleware} = require('../app/Kernel')

router.get('/status', [Middleware.Authorization], MasterController.getStatus);
router.get('/grade', [Middleware.Authorization], MasterController.getClassGrade);
router.get('/semester', [Middleware.Authorization], MasterController.getSemester);
router.get('/location', [Middleware.Authorization], MasterController.getLocation);
router.get('/class-name', [Middleware.Authorization], MasterController.getClassName);
router.get('/lesson-type', [Middleware.Authorization], MasterController.getLessonType);
router.get('/class-type', [Middleware.Authorization], MasterController.getDataClassType);
router.get('/teacher-type', [Middleware.Authorization], MasterController.getTeacherType);

module.exports = router;