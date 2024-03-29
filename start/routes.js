'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('index')
Route.get('/', 'EventController.home');
Route.get('/events','EventController.showAll');
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');

Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});

Route.get('/user/events', 'EventController.userIndex');
Route.get('/post-an-event', 'EventController.static_create');
Route.get('/post-an-event/delete/:id', 'EventController.delete');
Route.get('/post-an-event/edit/:id', 'EventController.edit');
Route.post('/post-an-event/update/:id', 'EventController.update').validator('CreateEvent');
Route.post('/post-an-event/', 'EventController.create').validator('CreateEvent');