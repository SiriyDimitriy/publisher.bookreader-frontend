## react-isomorphic-example v 2.2.0


### You can see demo here:

[react-isomorphic-example.k-3soft.com](http://react-isomorphic-example.k-3soft.com)


### Used libraries:

 1. react-isomorphic-tools@^2.3.5
 2. react-router@^4.1.1
 3. react-router-dom@^4.1.1
 4. react-router-config@^1.0.0-beta.3
 5. react-router-redux@^5.0.0-alpha.6
 6. react-hot-loader@^3
 7. styled-components@^2.0.0
 8. react-helmet@^5.0.3
 9. react-intl@^2.3.0
 10. webpack@^3.5.5
 11. jest@^20.0.4
 12. enzyme@^2.9.1
 13. expressjs@^4.15.4

### Works:

 - [x] Preload data before transition
 - [x] Preload data for ServerSide
 - [x] Chunks implements through async func, and will run when transition is doing to that route
 - [x] Handler of errors both client and server
 
#### Example implementations of async Routes
 
 ```js
 import App from '../components/App'
 
 const routes = [
     {
         component: App,
         path: '/',
         routes:[
             {
                 path: '/home',
                 getComponent: ()=>import('../components/Home') //returns promise,
                 preload:({fetcher})=>{
                     return fetcher('/testApiData', { //return promise
                         method: 'GET',
                         params:{
                             id: 1
                         }
                     })
                 }
             }
         ]
     }
 ]
 ```
 
###### to be continued...