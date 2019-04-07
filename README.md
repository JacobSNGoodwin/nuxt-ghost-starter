# nuxt-ghost-starter

> Nuxt Static and Universal site generation using the Ghost Content API and NUXTJS
>
> Site fetches and provides Ghost blog data to NUXTJS components
> With data already provided to the VUE components, a site can be rapidly templated

## Build Setup

To get the Ghost Content API working, you will first need to access your blog's backend to get the API key. Instructions may be found [here](https://docs.ghost.org/api/content/#authentication).

You will then need to provide this information to the file .env.example, and the rename this file to '.env'. This app uses @nuxtjs/dotenv to load these environment variables into the project.

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Important Configuration

The /util/ghost.js file contains some important configuration items. 

First, it exports the GhostContent API that can then be used in components to fetch data (for both static and universal site generation). This must be called as a function in other components.

Second, you will see the array _postIndexFields_. As you may not want to provide all post data to you home page for posts links, you can configure desired items in this array. See the [Ghost Content API](https://docs.ghost.org/api/content/#resources) for more details.

Last but not least, it contains a function called _generateRoutes_ that is imported in nuxt.config.js. This will generate dynamic routes (depending on how many post pages, authors, and tags are fetched) when you run __npm run generate__. See [https://nuxtjs.org/api/configuration-generate](NUXT generate property).

You may need to tweak this to your liking, but for now it generates are post, pages, and index pages for all posts, posts by tag, and post by author with pagination. 

In nuxt.config.js you will also note that:
```
generate: {
    subFolders: false,
    ...
  }
```

The _subFolders_ property was set to false to be able to provide a 404 error pages with Ghost's Navigation data (dynamic data retrieved from Ghost) when generating a static site. This page is 404.vue.

## In Action

To see a Netlify-hosted, statically generated version of this site in action, visit [https://blog.jacobsngoodwin.com](https://blog.jacobsngoodwin.com)

For a detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
