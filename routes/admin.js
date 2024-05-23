const {Router} = require('express')
const router = Router()
const {
    TeacherController,
    StudentController,
    MasterController,
} = require('../app/Controller/Controller')
const {
    Authorization,
    SuperadminMiddleware,
} = require('../app/Kernel')

/*
*   router for code-master
*/
router.post('/input-code', [Authorization, SuperadminMiddleware], MasterController.inputDataMaster);

/*
*   router for teacher feature
*/
router.get('/teacher', [Authorization, SuperadminMiddleware], TeacherController.index);
router.get('/teacher/:id/detail', [Authorization, SuperadminMiddleware], TeacherController.show);
router.put('/teacher/:id/update', [Authorization, SuperadminMiddleware], TeacherController.update);
router.delete('/teacher/:id/delete', [Authorization, SuperadminMiddleware], TeacherController.delete);
router.post('/teacher/create', [Authorization, SuperadminMiddleware], TeacherController.createDataTeacher);
router.patch('/teacher/:id/activate', [Authorization, SuperadminMiddleware], TeacherController.activateTeacher);
router.patch('/teacher/:id/change-photo', [Authorization, SuperadminMiddleware], TeacherController.changePhotoTeacher);
router.patch('/teacher/:id/remove-photo', [Authorization, SuperadminMiddleware], TeacherController.removePhotoTeacher);

/*
*   router for student feature
*/
router.get('/student', [Authorization, SuperadminMiddleware], StudentController.getDataStudent);
router.post('/student/create', [Authorization, SuperadminMiddleware], StudentController.inputDataStudent);
router.put('/student/:id/update', [Authorization, SuperadminMiddleware], StudentController.updateDataStudent);
router.delete('/student/:id/delete', [Authorization, SuperadminMiddleware], StudentController.deleteDataStudent);
router.get('/student/:id/detail', [Authorization, SuperadminMiddleware], StudentController.showDetailDataStudent);
router.patch('/student/:id/activate', [Authorization, SuperadminMiddleware], StudentController.changeStatusStudent);
router.patch('/student/:id/change-photo', [Authorization, SuperadminMiddleware], StudentController.changePhotoStudent);
router.patch('/student/:id/remove-photo', [Authorization, SuperadminMiddleware], StudentController.removePhotoStudent);

module.exports = router