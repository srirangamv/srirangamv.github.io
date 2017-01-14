---
layout: post
title: "Single Page App with Vue.Js"
name: "2017-01-14-spa_app_vuejs"
description: "Single Page App with Vue.Js."
date: 2017-01-14
---

<p>...</p>

<p>
    <figure>
      <img src="/images/VueJsDemo.png" alt="VueJs Single Page App Screens" width="600" height="450" />
      <figcaption>VueJs Single Page App Screens</figcaption>
    </figure>    
</p>

{% highlight html %}

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <title>Title</title>

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
</head>
<body>
    <div id="app">
      <h1>Hello Movies!</h1>
      <p>
        <router-link to="/movies">Movies</router-link>
        <router-link to="/actors">Actors</router-link>
      </p>
      <router-view></router-view>
    </div>
</body>

<script id="actorsTemplate" type="text/x-template">
    <div>
        <ol>
            <li><router-link to="/actors/profile">Sean Connery</router-link></li>
            <li><router-link to="/actors/profile">Jude Law</router-link></li>
        </ol>
        <router-view></router-view>
    </div>
</script>
<script>
    //Data store.
    const imdb = [
                    { text: 'Behind Eneny Lines' },
                    { text: 'Eneny At The Gates' },
                    { text: 'World In Not Enough' },
                    { text: 'Tomorrow Never Dies' }
                ];
    
    const Actors = {
       template: '#actorsTemplate'
    };

    const ActroProfile = {
        template: '<div>simple actor profile</div>'
    }

    // Movies page component
    const Movies = {
        data: function(){
            console.log('data function called');
            return {
                newmovie:'',
                movies: []
            };
        },
        methods: {
            addMovie: function () {
                this.movies.push({
                    text: this.newmovie
                });
                this.newmovie = '';
                //router.replace('actors');
                return false;
            }
        },
       template:
                '<div>'+
                    '<ol>'+
                        '<li v-for="movie in movies">'+
                            '{{ movie.text }}'+
                        '</li>'+
                    '</ol>'+
                    '<input type="text" v-model="newmovie">'+
                    '<button v-on:click="addMovie">New</button>'+
                '<div>',
        //component life cycle methods
        created: function () {
            console.log('created');
        },
        updated: function () {
            console.log('updated');
        },
        mounted: function () {
            console.log('mounted');
        },
        destroyed: function () {
            console.log('destroyed');
        },
        beforeRouteEnter: function(to, from, next) {
            console.log('router entered');
            next(function(vm){
                vm.movies = imdb;
            });
        }
    };

    const routes = [
        { path: '/', component: Movies },
        { path: '/movies', component: Movies },
        { path: '/actors', component: Actors, children: [
                {
                  path: 'profile',
                  component: ActroProfile
                }
            ]
        }
    ];
    
    const router = new VueRouter({
      routes: routes // short for routes: routes
    });
    
    const app = new Vue({
      router: router
    }).$mount('#app');

</script>
</html>


{% endhighlight %}

<b>Output:</b>
<p class="output">
Here is the browser's console log for aoo home page.

router entered
data function called
created
mounted
updated
</p>