const express = require('express')
const router = express.Router()
const serviceController = require('../controller/admin/ServiceController.js')
const CareerController = require('../controller/admin/CareerController.js')
const UserController = require('../controller/client/UserController.js')
const ProductController = require('../controller/admin/ProductController.js')
const ApplicationController = require('../controller/client/ApplicationController.js')
const AdminController = require('../controller/admin/adminAuth.js')
const {isAdmin,isLogin} = require('../middleware/Authmiddilware.js');
// img utility
const upload = require("../utility/imgUtility.js");
// portfolio controller
const portfolioController = require("../controller/admin/portfolioController.js");
const teamController = require('../controller/admin/teamController.js');
// blog controller
const blogController = require("../controller/admin/blogController.js");
// category controller
const categoryController = require("../controller/admin/categoryController.js");
// representative controller
const representativeController = require("../controller/representativeController.js");
const {isLogInRep, isRep } = require('../middleware/repMiddleware.js')
const { isLogReg } = require('../middleware/registerMiddleware.js')

// Admin Api
router.post('/CreateAdmin', AdminController.CreateAdmin)
router.post('/adminLogin', AdminController.Adminlogin)
router.get('/getAdminProfile', isLogin,isAdmin, AdminController.getAdminProfile)
//  service
router.get
(
    '/get-all-service',
    serviceController.getAllService
)

router.post
(
    '/create-service',
    serviceController.CreateService
)
router.put
(
    '/update-service/:id'
    , serviceController.updateService
);
router.delete
(
    '/delete-service/:id',
    serviceController.deleteService
)
router.get
(
    '/get-service-by-id/:id',
    serviceController.getServiceById
)
// career
router.get('/getAllCareer', CareerController.getAllCareer)
router.post('/createCareer',isLogin,isAdmin, CareerController.CreateCareer)
router.put('/updateCareer/:careerID', isLogin,isAdmin, CareerController.updateCareer)
router.delete('/deleteCareer/:CareerID', isLogin,isAdmin, CareerController.deleteCareer)
router.get('/getSingleCareer/:CareerID', CareerController.getSingleCareer)

// user 
router.delete('/DeleteUser/:id', UserController.deleteUser)
router.get('/Allusers', isLogin ,UserController.getAllUsers)
// application

router.get('/getApplication',isLogin,isAdmin, ApplicationController.getApplication)
router.get('/career/applications/:careerId' , isLogin,isAdmin, ApplicationController.getApplicationsByCareer);
router.delete('/deleteApplications/:id' , isLogin,isAdmin, ApplicationController.deleteApplication);

// product controller
router.post
(
    '/create-product',
   ProductController.CreateProduct
);
router.get
(
    '/get-products',
    ProductController.GetProducts
);

router.put
(
    '/update-product/:id',
    
    ProductController.UpdateProduct
);

router.delete
(
    '/delete-product/:id', 
   
    ProductController.DeleteProduct
);

router.get
(
    "/single-product/:id",
    ProductController.singleProductById
)

router.put('/UpdateProduct/:id', ProductController.UpdateProduct);
router.delete('/DeleteProduct/:id', ProductController.DeleteProduct);

// portfolio api

router.post
(
    "/portfolio/create", 
     portfolioController.createPortfolio
);

router.delete(
    "/portfolio/delete/:id",
     portfolioController.deletePortfolio
);

router.put
(
    "/portfolio/update/:id",
    portfolioController.updatePortfolio
);

router.get
(
    "/get-all-portfolio",
    portfolioController.getAllPortfolio
);

router.get("/single/portfolio/:id", portfolioController.singlePortfolio);



// ----client api

// user Authorization
router.post('/CreateUser', UserController.CreateUser)
router.post('/EmailVerify/:email/:otp', UserController.EmailVerify)
router.post('/login', UserController.login)
router.get('/getProfile', isLogin, UserController.getProfile)
router.put('/UpdateUser/:id', UserController.updateUser)
router.delete('/DeleteUser/:id', UserController.deleteUser)
// apply job
router.post('/applyJob', ApplicationController.applyJob);
router.get("/all-applications", ApplicationController.allApplications);
router.delete("/delete-application/:id", ApplicationController.deleteApplicationById);
router.put('/updateApplication/:id',isLogin, ApplicationController.updateApplication)
router.get('/getApplicationByUser' , isLogin, ApplicationController.getApplicationByUser);


// team related api 
router.post('/member', teamController.createMember);
router.get('/member', teamController.getAllMember);
router.get('/member/:id', teamController.singleMember);
router.put('/member/:id', teamController.updateMember);
router.delete('/member/:id', teamController.deleteMember);

// blog related api

router.post('/blog/create', blogController.blogCreate);
router.put('/blog/update/:id', blogController.blogUpdate);
router.delete('/blog/delete/:id', blogController.blogDelete);
router.get('/blog/single/:id', blogController.singleBlog);
router.get('/all/blog', blogController.allBlog);

// category related api

router.post('/category/create', categoryController.categoryCreate);
router.put('/category/update/:id', categoryController.categoryUpdate);
router.delete('/category/delete/:id', categoryController.categoryDelete);
router.get('/category/list', categoryController.categoryList);
router.get(`/category-by-id/:id`, categoryController.categoryById);

// representative related api

router.post('/representative/create', representativeController.createRepresentative);
router.put("/representative/status-update/:id", isLogin,isAdmin ,representativeController.updateRoleRepresentative);
router.post('/representative/login', representativeController.loginRepresentative );
router.get('/representative/profile',isLogInRep, representativeController.repProfile );
router.delete('/representative/delete/:id',isLogin,isAdmin , representativeController.deleteRepresentative);
router.get('/representative',isLogin,isAdmin,representativeController.allRepresentatives);
router.get("/representative/valid",isLogin,isAdmin,representativeController.validRepresentatives);
router.get("/representative/by-referid", isLogInRep,representativeController.representativesByReferNumber);
router.put("/representative/step-two", isLogReg,representativeController.registrationStepTwo);





module.exports = router