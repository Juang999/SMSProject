const {Router} = require('express')
const router = Router()
const {
    ClassController,
    MasterController,
    LessonController,
    EntityController,
    TeacherController,
    StudentController,
    PeriodeController,
} = require('../app/Controller/Controller')
const {
    Authorization,
    SuperadminMiddleware,
} = require('../app/Kernel')

/**
*   router for code-master
*/
router.get('/master/field', [Authorization], MasterController.getFieldCodeMaster);
router.post('/master/create', [Authorization, SuperadminMiddleware], MasterController.store);
router.put('/master/:id/update', [Authorization, SuperadminMiddleware], MasterController.update);
router.delete('/master/:id/delete', [Authorization, SuperadminMiddleware], MasterController.delete);

/**
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

/**
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

/**
*   router for periode feature
*/
router.get('/periode', [Authorization, SuperadminMiddleware], PeriodeController.index);
router.post('/periode/create', [Authorization, SuperadminMiddleware], PeriodeController.store);
router.get('/periode/:id/detail', [Authorization, SuperadminMiddleware], PeriodeController.show);
router.get('/periode/list', [Authorization, SuperadminMiddleware], PeriodeController.periodeList);
router.put('/periode/:id/update', [Authorization, SuperadminMiddleware], PeriodeController.update);
router.delete('/periode/:id/delete', [Authorization, SuperadminMiddleware], PeriodeController.delete);
router.put('/periode/:id/update-detail', [Authorization, SuperadminMiddleware], PeriodeController.updateDetailPeriode);

/**
 *  router for entity feature
*/
router.get('/entity', [Authorization, SuperadminMiddleware], EntityController.index);
router.post('/entity/create', [Authorization, SuperadminMiddleware], EntityController.store);
router.get('/entity/:id/detail', [Authorization, SuperadminMiddleware], EntityController.show);
router.put('/entity/:id/update', [Authorization, SuperadminMiddleware], EntityController.update);
router.patch('/entity/:id/activate', [Authorization, SuperadminMiddleware], EntityController.activate);
router.post('/entity/detail-entity/create', [Authorization, SuperadminMiddleware], EntityController.storeDetailEntity);
router.delete('/entity/detail-entity/:id/delete', [Authorization, SuperadminMiddleware], EntityController.deleteDetailEntity);
router.patch('/entity/detail-entity/:id/activate', [Authorization, SuperadminMiddleware], EntityController.activateDetailEntity);

/**
*   router for class feature
*/
router.get('/class', [Authorization, SuperadminMiddleware], ClassController.index);
router.post('/class/create', [Authorization, SuperadminMiddleware], ClassController.store);
router.get('/class/:id/detail', [Authorization, SuperadminMiddleware], ClassController.show);
router.put('/class/:id/update', [Authorization, SuperadminMiddleware], ClassController.update);
router.delete('/class/:id/delete', [Authorization, SuperadminMiddleware], ClassController.delete);
router.post('/class/student-class/create', [Authorization, SuperadminMiddleware], ClassController.storeStudent);
router.post('/class/homeroom-teacher/create', [Authorization, SuperadminMiddleware], ClassController.storeHomeroomTeacher);
router.delete('/class/student-class/:id/delete', [Authorization, SuperadminMiddleware], ClassController.deleteStudentClass);
router.delete('/class/homeroom-teacher/:id/delete', [Authorization, SuperadminMiddleware], ClassController.deleteHomeroomTeacher);

/**
 * router for lesson feature
*/
router.get('/lesson', [Authorization, SuperadminMiddleware], LessonController.index);
router.post('/lesson/create', [Authorization, SuperadminMiddleware], LessonController.store);
router.get('/lesson/:id/detail', [Authorization, SuperadminMiddleware], LessonController.show);
router.put('/lesson/:id/update', [Authorization, SuperadminMiddleware], LessonController.update);
router.delete('/lesson/:id/delete', [Authorization, SuperadminMiddleware], LessonController.delete);
router.post('/lesson/lesson-class/create', [Authorization, SuperadminMiddleware], LessonController.addLessonClass);
router.post('/lesson/lesson-teacher/create', [Authorization, SuperadminMiddleware], LessonController.addLessonTeacher);
router.put('/lesson/lesson-class/:id/update', [Authorization, SuperadminMiddleware], LessonController.updateLessonClass);
router.delete('/lesson/lesson-class/:id/delete', [Authorization, SuperadminMiddleware], LessonController.deleteLessonClass);
router.delete('/lesson/lesson-teacher/:id/delete', [Authorization, SuperadminMiddleware], LessonController.deleteLessonTeacher);

module.exports = router