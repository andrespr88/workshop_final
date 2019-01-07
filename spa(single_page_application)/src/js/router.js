import crossroads from 'crossroads'
import homeController from './controllers/homeController'
import peopleController from './controllers/peopleController'
import localController from './controllers/localController'
import contactContoller from './controllers/contactContoller'

  crossroads.addRoute('/', function () {
    $('#root').load('./partials/home.html', homeController);
    console.log('Pagina Principal');
  })
  
  crossroads.addRoute('#/people', function () {
    $('#root').load('./partials/people.html', peopleController);
    console.log('Pagina de Personajes');
  })
  
  crossroads.addRoute('#/local-storage', function () {
    $('#root').load('./partials/local-storage.html', localController);
    console.log('Pagina de Peronajes Guardados')
  })
  
  crossroads.addRoute('#/contact', function () {
    $('#root').load('./partials/contact.html', contactContoller);
    console.log('Pagina de Contacto')
  })
  
  // En cada cambio del # va a verificar las rutas
  $(window).on('hashchange', function () {
    crossroads.parse(window.location.hash)
  })
  
  crossroads.parse(window.location.hash)

