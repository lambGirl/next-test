const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();
app.prepare()
.then(() => {
    const server = express()

    //在这里，我们只是将自定义路线映射到现有页面“/ post”。我们也映射了查询参数。
    //需要自定义后端路由
    server.get('/p/:id', (req, res) => {
        const actualPage = '/post'
        const queryParams = { title: req.params.id }
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})
