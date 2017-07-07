/**
 * starts a hapi server
 * in production
 */

const Hapi = require('hapi')
const Inert = require('inert')

/*
const serverOptionsDevelopment = {
  debug: {
    log: ['error'],
    request: ['error']
  }
}*/
const server = new Hapi.Server()

server.register(Inert, function() {
  server.connection({
    host: '0.0.0.0',
    port: 3000,
  })

  server.start(function(err) {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })

  server.route({
    method: 'GET',
    path: '/manifest.json',
    handler: function(request, reply) {
      reply.file('manifest.json')
    },
  })

  server.route({
    method: 'GET',
    path: '/asset-manifest.json',
    handler: function(request, reply) {
      reply.file('asset-manifest.json')
    },
  })

  server.route({
    method: 'GET',
    path: '/service-worker.js',
    handler: function(request, reply) {
      reply.file('service-worker.js').type('text/javascript')
    },
  })

  server.route({
    method: 'GET',
    path: '/tinymce.css',
    handler: function(request, reply) {
      reply.file('tinymce.css')
    },
  })

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: function(request, reply) {
      reply.file('favicon.ico')
    },
  })

  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      file: 'index.html',
    },
  })

  server.route({
    method: 'GET',
    path: '/static/css/{param*}',
    handler: {
      directory: {
        path: 'static/css',
        index: false,
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/static/js/{param*}',
    handler: {
      directory: {
        path: 'static/js',
        index: false,
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/static/media/{param*}',
    handler: {
      directory: {
        path: 'static/media',
        index: false,
      },
    },
  })

  server.route({
    method: 'GET',
    path: '/favicons/{param*}',
    handler: {
      directory: {
        path: 'favicons',
        index: false,
      },
    },
  })
})
