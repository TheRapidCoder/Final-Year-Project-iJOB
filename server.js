require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./seeds/index');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const server = require('http').createServer(app)
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const Job = require("./models/job-model");
const User = require("./models/user-model")
const bcrypt = require("bcrypt");
const Admin = require("./models/admin");

////////

 const passport=require('passport');
 const passportLocal=require('./config/passport-local-strategy');  



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))


app.use(cookieParser());

const sessionConfig = {
    name:'ijob',
    secret: 'thisshouldbeasecret',
    resave: false,
    saveUninitialized: true, //false
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
    }
}
app.use(session(sessionConfig));

/////
app.use(passport.initialize());
app.use(passport.session());




app.use(flash())
app.use((req, res, next) => {
    console.log(req.user)
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
})

const PORT = process.env.PORT || 5500;


app.use(express.json());
app.use(router);

// router.get('/' , (req ,res) => {
//     return res.render('./jobs/list');
// });

router.get("/",async(req,res)=>{
    try{
    const allJob = await Job.find();
    res.render('./jobs/list',{jobs:allJob});
    }catch(e){
        res.send(error.message);
    }
    
})

// filter
router.post("/filter",async (req,res)=>{
    
    let title =  req.body.title === ''? 'llaksdjflkasdflk2135646546' : req.body.title;
    let location =  req.body.location=== ''?  'llaksdjflkasdflk2135646546'  : req.body.location;;
    let salary =  req.body.salary=== ''?  'llaksdjflkasdflk2135646546'  : req.body.salary;;
    let experience = req.body.experience=== ''?  'llaksdjflkasdflk2135646546'  : req.body.experience;;
console.log(req.body.title);
    let allJob = await Job.find({
        "$or" : [
            {"title" : title},
            {"location" : location},
            {"salary" : salary},
            {"experience" : experience}
        ]
    })


    
    res.render("./jobs/list",{jobs:allJob});
    
});











//create job 
// router.post("/admin/signup",async (req,res)=>{
//     const {email,password,name} = req.body;
//     const hashedPassword = bcrypt.hashSync(password,5);
//     await Admin.insertMany({email,password,name});
//     res.redirect("/admin");
// })

router.post("/admin/login",async(req,res)=>{
   const {email,password} = req.body;
   console.log(password);
    const user = await Admin.findOne({email});
    // console.log(user.password)
    if(user){
        if(user.password === password){
            
            res.render("./admin/home");
        }
    }
});


router.get("/admin",(req,res)=>{
    res.render("./admin/login");
});

//admin signup 
router.get("/admin/signup",(req,res)=>{
    res.render("./admin/signup");
});

//
router.post("/admin/signup",async(req,res)=>{
    console.log(req.body);
    await Admin.create(req.body);
    res.send("Admin is created");
});



// find all jobs hear


router.get("/postjobs",(req,res)=>{
    res.render('./jobs/postjobs')
})

router.post("/postjobs",async(req,res)=>{
    console.log(req.body);
    await Job.insertMany(req.body);

    try{
        const allJob = await Job.find();
    res.render('./admin/alljobs',{jobs:allJob});
    }catch (e){
        res.send(error.message)
    }
    res.render("./admin/alljobs");
})

//all jobs admin
router.get("/admin/alljobs",async(req,res)=>{
    try{
        const allJob = await Job.find();
    res.render('./admin/alljobs',{jobs:allJob});
    }catch (e){
        res.send(error.message)
    }
})


















// signout
router.get("/signout",async(req,res)=>{
    res.clearCookie("t");
    res.render('index');
})

//create user
router.get("/admin/adduser",(req,res)=>{
    res.render("./seed/User");
})
router.post("/adduser",async (req,res)=>{
    await User.create(req.body);
    User.password=null;
    res.redirect("/admin/adduser")
})

//delete jobs admin
router.get('/admin/deletejob',(req,res)=>{
    let id=req.query.id;
    Job.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("Error in deleting the Job");
            return;
        }
        return res.render('./admin/home');
    })
})


//check
router.get("/check",async(req,res)=>{
    try{
        const allJob = await Job.find();
    res.render('./jobs/list',{jobs:allJob});
    }catch (e){
        res.send(error.message)
    }
})

//job details
// router.get('/jobs/details',async(req,res)=>{
//     try{
//         const allJob = await Job.find();
//     res.render('./jobs/detail',{jobs:allJob});
//     }catch (e){
//         res.send(error.message)
//     }
// })

router.get('/jobs/details',async(req,res)=>{
    let id=req.query.id;
    const allJob=await Job.find({'_id':id});
    res.render('./jobs/detail',{jobs:allJob});
})









server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
