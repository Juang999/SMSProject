const {Router} = require('express')
const router = Router()
const {Middleware, Requests} = require('../app/Kernel')
const {
    PeriodeController,
    ClassController, LessonController, 
    MasterController, EntityController, 
    TeacherController, StudentController, 
} = require('../app/Controller/Controller')

/**
*   router for code-master
*/
router.get('/master/field', [Middleware.Authorization], MasterController.getFieldCodeMaster);
router.post('/master/create', [Middleware.Authorization, Middleware.SuperadminMiddleware, Requests.MasterCreateRequest], MasterController.store);
router.put('/master/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware, Requests.MasterUpdateRequest], MasterController.update);
router.delete('/master/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware, Requests.MasterDeleteRequest], MasterController.delete);

/**
*   router for teacher feature
*/
router.get('/teacher', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.index);
router.post('/teacher/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.store);
router.get('/teacher/:id/detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.show);
router.put('/teacher/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.update);
router.delete('/teacher/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.delete);
router.patch('/teacher/:id/activate', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.activateTeacher);
router.patch('/teacher/:id/change-photo', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.changePhotoTeacher);
router.patch('/teacher/:id/remove-photo', [Middleware.Authorization, Middleware.SuperadminMiddleware], TeacherController.removePhotoTeacher);

/**
*   router for student feature
*/
router.get('/student', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.index);
router.post('/student/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.store);
router.get('/student/:id/detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.show);
router.put('/student/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.update);
router.delete('/student/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.delete);
router.patch('/student/:id/activate', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.activateStudent);
router.patch('/student/:id/change-photo', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.changePhotoStudent);
router.patch('/student/:id/remove-photo', [Middleware.Authorization, Middleware.SuperadminMiddleware], StudentController.removePhotoStudent);

/**
*   router for periode feature
*/
router.get('/periode', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.index);
router.post('/periode/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.store);
router.get('/periode/:id/detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.show);
router.get('/periode/list', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.periodeList);
router.put('/periode/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.update);
router.delete('/periode/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.delete);
router.put('/periode/:id/update-detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], PeriodeController.updateDetailPeriode);

/**
 *  router for entity feature
*/
router.get('/entity', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.index);
router.post('/entity/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.store);
router.get('/entity/:id/detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.show);
router.put('/entity/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.update);
router.patch('/entity/:id/activate', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.activate);
router.post('/entity/detail-entity/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.storeDetailEntity);
router.delete('/entity/detail-entity/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.deleteDetailEntity);
router.patch('/entity/detail-entity/:id/activate', [Middleware.Authorization, Middleware.SuperadminMiddleware], EntityController.activateDetailEntity);

/**
*   router for class feature
*/
router.get('/class', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.index);
router.post('/class/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.store);
router.get('/class/:id/detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.show);
router.put('/class/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.update);
router.delete('/class/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.delete);
router.post('/class/student-class/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.storeStudent);
router.post('/class/homeroom-teacher/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.storeHomeroomTeacher);
router.delete('/class/student-class/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.deleteStudentClass);
router.delete('/class/homeroom-teacher/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], ClassController.deleteHomeroomTeacher);

/**
 * router for lesson feature
*/
router.get('/lesson', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.index);
router.post('/lesson/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.store);
router.get('/lesson/:id/detail', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.show);
router.put('/lesson/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.update);
router.delete('/lesson/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.delete);
router.post('/lesson/lesson-class/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.addLessonClass);
router.post('/lesson/lesson-teacher/create', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.addLessonTeacher);
router.put('/lesson/lesson-class/:id/update', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.updateLessonClass);
router.delete('/lesson/lesson-class/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.deleteLessonClass);
router.delete('/lesson/lesson-teacher/:id/delete', [Middleware.Authorization, Middleware.SuperadminMiddleware], LessonController.deleteLessonTeacher);

module.exports = router