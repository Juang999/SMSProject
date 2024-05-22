const {Router} = require('express')
const router = Router()
const {
    TeacherController,
    StudentController
} = require('../app/Controller/Controller')
const {
    Authorization
} = require('../app/Kernel')

/*
* router for teacher
*/
router.get('/teacher', [Authorization], TeacherController.index)
router.get('/teacher/:id/detail', [Authorization], TeacherController.show)
router.put('/teacher/:id/update', [Authorization], TeacherController.update)
router.post('/teacher/create', [Authorization], TeacherController.createDataTeacher)
router.delete('/teacher/:id/delete', [Authorization], TeacherController.delete)

module.exports = router