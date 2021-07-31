const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const User = require('./models/user');
const bodyParser = require('body-parser');
const { response } = require('express');
const { remove } = require('./models/user');

mongoose.connect('mongodb://localhost:27017/lifeOrgUsers', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // allows acces to req.body ; adds put and post for forms
        app.use(express.urlencoded({ extended: true }));
        app.use(methodOverride('_method'));
        //app.use(bodyParser.json)

    // using static assets in public directory
        app.use(express.static('public'));


            // -------------------------------
            //                 ROUTES
            // -------------------------------

        let currentUser = undefined;

        // login/signup pages
        app.get('/', (req, res) => {
            res.render('pages/enterPage')
        })
        app.get('/logout', (req, res) => {
            currentUser = undefined;
            res.redirect('/')
        })
            // Login
            app.get('/login', (req, res) => {
                res.render('pages/loginPage')
            })
            app.post('/login', async (req, res) => {
                const user = await User.find({username: req.body.username, password: req.body.password});
                //console.log('req username', req.body.username);
                currentUser = user[0]._id;
                //console.log('user Id', user[0]._id);
                //console.log('logged in user', currentUser);
                res.redirect('/home')
            })

            // Sign Up
            app.get('/register', (req, res) => {
                res.render('pages/registerPage')
            })
            app.post('/register', async (req, res) => {
                // if (req.body.username === "" || req.body.password === ""){
                //     console.log("Empty Username or Password \n Please Retry with Valid Inputs");
                //     res.redirect('/register')
                // }
                const newUser  = new User({
                    username: req.body.username,
                    password: req.body.password
                })
                await newUser.save();
                //console.log(newUser._id);
                currentUser = newUser._id;
                // console.log('current user',currentUser);
                res.redirect('/home')
            })


        // home page
        app.get('/home', async (req, res) => {
            const user = await User.findById(currentUser);
            // console.log('user being used', user);
            // res.sendFile(path.join(__dirname, '/homePage.html'));
            res.render('pages/homePage', { user })
        })

        // profile - Account Info Page
        app.get('/home/profile', async (req, res) => {
            const user = await User.findById(currentUser);
            const userName = user.username;
            const passWord = user.password;
            const userIncome = user.budget.income;
            const userWorth = user.financesWorth.netWorth;
            const userAge = user.basic.age;
            // console.log(' age', userAge)
            // console.log('net worth',userWorth)
            // console.log('income', userIncome)
            res.render('pages/profilePage', { userName, passWord, userIncome, userWorth, userAge })
        })
        app.put('/profile', async (req, res) => {
            // console.log(req.body);
            await User.findOneAndUpdate({_id: currentUser}, {$set: {username: req.body.username, password: req.body.password, financesWorth: {netWorth: req.body.netWorth}, } }, { runValidators: true, new: true });
            res.redirect('/home/profile')
        }) 


            // finances page
                app.get('/finances', async (req, res) => {
                    const user = await User.findById(currentUser);
                    const userBudget = user.budget;
                    const userWorth = user.financesWorth;
                    console.log('net worth',userWorth)
                    console.log('budget', userBudget)
                    // res.sendFile(path.join(__dirname, '/finances.html'));
                    res.render('pages/finances', { userBudget, userWorth })
                })
                app.put('/finances/budget', async (req, res) => {
                    //console.log(req.body)
                    await User.findOneAndUpdate({_id: currentUser}, {$set: {budget: req.body}}, { runValidators: true, new: true });
                    //console.log(userFinances)
                    res.redirect('/finances');
                })
                app.put('/finances/netWorth', async (req, res) => {
                    // console.log(req.body)
                    await User.findOneAndUpdate({_id: currentUser}, {$set: {financesWorth: req.body}}, { runValidators: true, new: true });
                    res.redirect('/finances');
                })

            // todo page
                app.get('/todo', async (req, res) => {
                // res.sendFile(path.join(__dirname, '/toDoList.html'));
                const user = await User.findById(currentUser)
                const todos = user.toDo
                 console.log('user todos', todos)
                res.render('pages/toDoList', { todos })
                })
                app.put('/todo', async (req, res) => {
                    await User.findOneAndUpdate({_id: currentUser}, {$push: {toDo: req.body.newToDo}}, { runValidators: true, new: true });
                    res.redirect('/todo')
                })
                app.delete('/todoDelete', async(req, res) => {
                    // console.log(req.body.todo)
                    const user = await User.findById(currentUser)
                    const todos = user.toDo
                    const newTodos = removeTodo(todos, req.body.todo)
                    await User.findOneAndUpdate({_id: currentUser}, {$set: {toDo: newTodos}}, {runValidators: true, new: true });
                    res.redirect('/todo')
                })
                    const removeTodo  = function(array, value) {
                        let arr = array;

                        for(let i = 0; i < arr.length; i++){
                            if(arr[i] === value){
                                arr.splice(i,1);
                                return arr;
                            }
                        }
                    }

            // health page
                app.get('/health', async (req, res) => {
                    const user = await User.findById(currentUser);
                    const userBasic = user.basic;
                    const userVitals = user.vitals;
                    console.log('user basic', userBasic)
                    console.log('user vitals', userVitals)
                    // res.sendFile(path.join(__dirname, '/health.html'));
                    res.render('pages/health', { userBasic, userVitals })
                })
                app.put('/health/basic', async (req, res) => {
                    // console.log(req.body)
                    await User.findOneAndUpdate({_id: currentUser}, {$set: {basic: req.body}}, { runValidators: true, new: true });
                    res.redirect('/health');
                })
                app.put('/health/vitals', async (req, res) => {
                    // console.log(req.body)
                    await User.findOneAndUpdate({_id: currentUser}, {$set: {vitals: req.body}}, { runValidators: true, new: true });
                    res.redirect('/health');
                })


    //server location (localhost:9000)
    app.listen(3000, () => {
        console.log("APP IS LISTENING ON PORT 3000!");
    })


    // to release a port (Ex. at 9000)
    // kill -9 $(lsof -t -i:9000)