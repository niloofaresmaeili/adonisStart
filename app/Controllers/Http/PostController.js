'use strict'

// bring in model
const Posts = use('App/Models/Post')

class PostController {
    async index({ view }) {

        const posts = await Posts.all();
        console.log(posts.title);
        return view.render('posts.index',{
            title : 'Latest Posts',
            posts: posts.toJSON()
        })
    }

    async details({ params,view }){
        const post = await Posts.find(params.id)
        console.log(post)
        return view.render('posts.details',{
            post: post
        })
    }

    async add({view}){
        return view.render('posts.add')
    }

    async store({request , response , session }){
        const post = new Posts();
        post.title = request.input('title')
        post.body = request.input('body')

        await post.save()

        session.flash({notification: 'post added!'})

        return response.redirect('/posts')
    }
}

module.exports = PostController
