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
router.post('/teacher/create', [Authorization], TeacherController.createDataTeacher)

module.exports = router