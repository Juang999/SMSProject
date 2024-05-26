const {Router} = require('express')
const router = Router()
const {
    MasterController,
    TeacherController,
    StudentController,
    PeriodeController,
} = require('../app/Controller/Controller')
const {
    Authorization,
    SuperadminMiddleware,
} = require('../app/Kernel')

/*
*   router for code-master
*/
router.get('/field', [Authorization], MasterController.getFieldCodeMaster);
router.post('/input-code', [Authorization, SuperadminMiddleware], MasterController.inputDataMaster);

/*
*   router for teacher feature
*/
router.get('/teacher', [Authorization, SuperadminMiddleware], TeacherController.index);
router.post('/teacher/create', [Authorization, SuperadminMiddleware], TeacherController.store);
router.get('/teacher/:id/detail', [Authorization, SuperadminMiddleware], TeacherController.show);
router.put('/teacher/:id/update', [Authorization, SuperadminMiddleware], TeacherController.update);
router.delete('/teacher/:id/delete', [Authorization, SuperadminMiddleware], TeacherController.delete);
router.patch('/teacher/:id/activate', [Authorization, SuperadminMiddleware], TeacherController.activateTeacher);
router.patch('/teacher/:id/change-photo', [Authorization, SuperadminMiddleware], TeacherController.changePhotoTeacher);
router.patch('/teacher/:id/remove-photo', [Authorization, SuperadminMiddleware], TeacherController.removePhotoTeacher);

/*
*   router for student feature
*/
router.get('/student', [Authorization, SuperadminMiddleware], StudentController.index);
router.post('/student/create', [Authorization, SuperadminMiddleware], StudentController.store);
router.get('/student/:id/detail', [Authorization, SuperadminMiddleware], StudentController.show);
router.put('/student/:id/update', [Authorization, SuperadminMiddleware], StudentController.update);
router.delete('/student/:id/delete', [Authorization, SuperadminMiddleware], StudentController.delete);
router.patch('/student/:id/activate', [Authorization, SuperadminMiddleware], StudentController.activateStudent);
router.patch('/student/:id/change-photo', [Authorization, SuperadminMiddleware], StudentController.changePhotoStudent);
router.patch('/student/:id/remove-photo', [Authorization, SuperadminMiddleware], StudentController.removePhotoStudent);

/*
*   router for periode feature
*/
router.get('/periode', [Authorization, SuperadminMiddleware], PeriodeController.index);
router.post('/periode/create', [Authorization, SuperadminMiddleware], PeriodeController.store);
router.get('/periode/:id/detail', [Authorization, SuperadminMiddleware], PeriodeController.show);
router.put('/periode/:id/update', [Authorization, SuperadminMiddleware], PeriodeController.update);
router.delete('/periode/:id/delete', [Authorization, SuperadminMiddleware], PeriodeController.delete);
router.put('/periode/:id/update-detail', [Authorization, SuperadminMiddleware], PeriodeController.updateDetailPeriode);

module.exports = router