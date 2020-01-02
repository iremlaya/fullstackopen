const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await  Blog.find({})
    return response.json(blogs.map(b => b.toJSON()))
    
})

/*
notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
*/

blogsRouter.post('/', async(request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const saved = await blog.save()
        response.json(saved.toJSON())
    } catch (e) {
        next(e)
    }
   
})


blogsRouter.delete('/:id', async (request, response, next) => {
    
    try {
        const note = await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (e){
        next(e)
    }
    
})


notesRouter.put('/:id', (request, response, next) => {
    const body = request.body
    const curr = await findById(request.params.id)
    const blog = {
        title: curr.title,
        author: curr.author,
        url: curr.url,
        likes: body.likes,
    }

    
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
        response.json(updatedBlog.toJSON())
    } catch (e){
        next(e)
    }
})

module.exports = blogsRouter