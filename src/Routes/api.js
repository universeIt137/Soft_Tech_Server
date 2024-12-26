const express = require('express')
const router = express.Router()
const serviceController = require('../controller/admin/ServiceController.js')
const CareerController = require('../controller/admin/CareerController.js')
const UserController = require('../controller/client/UserController.js')
const ProductController = require('../controller/admin/ProductController.js')
const ApplicationController = require('../controller/client/ApplicationController.js')
const AdminController = require('../controller/admin/adminAuth.js')
const { isAdmin, isLogin } = require('../middleware/Authmiddilware.js');
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
const { isLogInRep, isRep } = require('../middleware/repMiddleware.js')
const { isLogReg } = require('../middleware/registerMiddleware.js')

// representative account info controller
const repBankInfoController = require("../controller/representative/repAccountInfoController");
// client controller
const clientController = require("../controller/client/clientController");
// product video upload controller
const productVideoUploadController = require("../controller/product/productVideoController.js");


// Admin Api
router.post('/CreateAdmin', AdminController.CreateAdmin)
router.post('/adminLogin', AdminController.Adminlogin)
router.get('/getAdminProfile', isLogin, isAdmin, AdminController.getAdminProfile);
router.get("/all-users", isLogin, isAdmin, AdminController.allUsers);
router.put("/user-status-update/:id", isLogin, isAdmin, AdminController.updateUserRole);
router.get("/single-user/:id", isLogin, isAdmin, AdminController.singleUserById);
//  service
router.get('/get-all-service',serviceController.getAllService)

router.post('/create-service',serviceController.CreateService)
router.put('/update-service/:id', serviceController.updateService);
router.delete('/delete-service/:id',serviceController.deleteService)
router.get('/get-service-by-id/:id',serviceController.getServiceById)
// career
router.get('/getAllCareer', CareerController.getAllCareer)
router.post('/createCareer', isLogin, isAdmin, CareerController.CreateCareer)
router.put('/updateCareer/:careerID', isLogin, isAdmin, CareerController.updateCareer)
router.delete('/deleteCareer/:CareerID', isLogin, isAdmin, CareerController.deleteCareer)
router.get('/getSingleCareer/:CareerID', CareerController.getSingleCareer)

// user 
router.delete('/DeleteUser/:id', UserController.deleteUser)
router.get('/Allusers', isLogin, UserController.getAllUsers)
// application

router.get('/getApplication', isLogin, isAdmin, ApplicationController.getApplication)
router.get('/career/applications/:careerId', isLogin, isAdmin, ApplicationController.getApplicationsByCareer);
router.delete('/deleteApplications/:id', isLogin, isAdmin, ApplicationController.deleteApplication);

// product controller
router.post('/create-product',ProductController.CreateProduct);
router.get('/get-products',ProductController.GetProducts);

router.put('/update-product/:id',ProductController.UpdateProduct);

router.delete('/delete-product/:id',ProductController.DeleteProduct);

router.get("/single-product/:id",ProductController.singleProductById)

router.put('/UpdateProduct/:id', ProductController.UpdateProduct);
router.delete('/DeleteProduct/:id', ProductController.DeleteProduct);

// portfolio api

router.post("/portfolio/create",portfolioController.createPortfolio);

router.delete("/portfolio/delete/:id",portfolioController.deletePortfolio);

router.put("/portfolio/update/:id",portfolioController.updatePortfolio);

router.get("/get-all-portfolio",portfolioController.getAllPortfolio);

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
router.put('/updateApplication/:id', isLogin, ApplicationController.updateApplication)
router.get('/getApplicationByUser', isLogin, ApplicationController.getApplicationByUser);


// team related api 
router.post('/member',isLogin,isAdmin ,teamController.createMember);
router.get('/member', teamController.getAllMember);
router.get('/member/:id', isLogin,isAdmin,teamController.singleMember);
router.put('/member/:id', isLogin,isAdmin,teamController.updateMember);
router.delete('/member/:id',isLogin,isAdmin, teamController.deleteMember);

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
router.put("/representative/status-update/:id", isLogin, isAdmin, representativeController.updateRoleRepresentative);
router.post('/representative/login', representativeController.loginRepresentative);
router.get('/representative/profile', isLogInRep, representativeController.repProfile);
router.delete('/representative/delete/:id', isLogin, isAdmin, representativeController.deleteRepresentative);
router.get('/representative', isLogin, isAdmin, representativeController.allRepresentatives);
router.get("/representative/valid", isLogin, isAdmin, representativeController.validRepresentatives);
router.get("/representative/by-referid", isLogInRep, representativeController.representativesByReferNumber);
router.put("/representative/step-two", isLogReg, representativeController.registrationStepTwo);
router.get("/single-representative/:id", isLogin, isAdmin, representativeController.representativeById);

// repBankInfo related api

router.post("/rep-bank-info", isLogInRep , repBankInfoController.repCreateBankInfo);
router.get("/rep-bank-info", isLogInRep , repBankInfoController.repAllBankInformation);
router.get("/rep-bank-info/:id", isLogInRep , repBankInfoController.repBankInformationById);
router.put("/rep-bank-info/:id", isLogInRep , repBankInfoController.repBankInfoUpdate);
router.delete("/rep-bank-info/:id", isLogInRep , repBankInfoController.repBankInfoDelete);


//client related api

router.post("/create-client" , isLogInRep ,clientController.createClient);
router.post("/client-role-update/:id",isLogin,isAdmin,clientController.clientRoleUpdate);
router.post("/client-login",clientController.clientLogin);
router.get("/all-client-by-admin", isLogin,isAdmin, clientController.allClientAdmin);
router.get("/client-by-admin/:id", isLogin, isAdmin, clientController.clientByIdAdmin);
router.post("/client-create-admin", isLogin, isAdmin, clientController.clientCreateByAdmin);
router.delete("/client-delete-admin/:id", isLogin, isAdmin, clientController.clientDeleteByAdmin);
router.put("/client-update-admin/:id", isLogin, isAdmin, clientController.clientUpdateByAdmin);
router.get("/allClientByRepresentative", isLogInRep, clientController.allClientByRepresentative);

// upload video related api

router.post("/product-video-upload", isLogin, isAdmin, productVideoUploadController.productUploadVideo);
router.get("/product-all-videos", isLogin, isAdmin, productVideoUploadController.allProductVideos);
router.get("/product-single-video/:id", isLogin, isAdmin, productVideoUploadController.singleProductVideo);
router.put("/product-video-update/:id", isLogin, isAdmin, productVideoUploadController.updateProductVideo);
router.delete("/product-video-delete/:id", isLogin, isAdmin, productVideoUploadController.deleteProductVideo);




module.exports = router