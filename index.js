const jex = require('./src/Jex')

const envTrait = require('./src/traits/env.trait')
const configTrait = require('./src/traits/config.trait')
const limitsTrait = require('./src/traits/limits.trait')
const helpersTrait = require('./src/traits/helpers.trait')

const sass = require('./src/tasks/sass')

jex.trait(envTrait)
jex.trait(configTrait)
jex.trait(limitsTrait)
jex.trait(helpersTrait)

jex.use(sass)

module.exports = jex.start()