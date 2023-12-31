const express=require('express');
const userController=require('./../controllers/userController');
const authController=require('./../controllers/authController');

const router=express.Router();

router.post('/signup', authController.signupUser);
router.post('/protect',authController.protect);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logout);



router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
