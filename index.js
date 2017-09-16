const Jex = require('./src/Jex')

const envTrait = require('./src/traits/env.trait')
const configTrait = require('./src/traits/config.trait')
const limitsTrait = require('./src/traits/limits.trait')
const helpersTrait = require('./src/traits/helpers.trait')

const sass = require('./src/tasks/sass')
const pug = require('./src/tasks/pug')
const js = require('./src/tasks/js')
const copy = require('./src/tasks/copy')
const server = require('./src/tasks/server')

const jex = new Jex

jex.trait(helpersTrait)
jex.trait(envTrait)
jex.trait(configTrait)
jex.trait(limitsTrait)

jex.use(sass)
jex.use(pug)
jex.use(js)
jex.use(copy)
jex.use(server)

jex.only('watch').server()

module.exports = jex.start()