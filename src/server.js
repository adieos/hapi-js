const routes = require('./routes.js')
const Hapi = require('@hapi/hapi')
const PORT = 9000

const init = async ()=>{
    const server = Hapi.server({
        host: 'localhost',
        port: PORT
    })

    server.route(routes)

    await server.start()

    console.log(`server running at ${server.info.uri}`)
}

init()