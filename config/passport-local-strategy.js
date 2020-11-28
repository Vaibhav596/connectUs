const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //Find a user and establish identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding User --> passport");
                return done(err);
            }
            if(!user || user.password!=password){
                console.log("Invalid Username or Password");
                return done(err,false);
            }
            return done(err,user);
        })
    }
));

//SEREALIZE USER FUNCTION TO DECIDE WHICH KEY MUST BE PUT IN THE COOKIE
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//DESEREALIZING THE USER FROM THE KEY IN THE COOKIES
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding User --> passport");
            return done(err);
        }
        return done(null,user);
    });
});

//CHECK IF USER IS AUTHENTICATED
passport.checkAuthentication = function(req,res,next){
    //If user ids signed in then pass request to action(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;