'use strict';

module.exports = function(_, passport){
    
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.indexHome);
        
            router.post('/signup', this.postSignUp);
        },
        
        indexPage: function(req, res){
            const errors = req.flash('error');
            return res.render('index', {title: 'FootballFans | Login', messages: errors, hasErrors: errors.length > 0});
        },
        
        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
        
        getSignUp: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {title: 'FootballFans | SignUp', messages: errors, hasErrors: errors.length > 0});
        },

        indexHome: function(req, res){
            return res.render('home');
        },
        
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        })
    }
    
}