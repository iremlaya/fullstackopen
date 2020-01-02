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

/*
notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote.toJSON())
        })
        .catch(error => next(error))
})
*/
module.exports = blogsRouter