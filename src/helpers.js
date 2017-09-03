/**
 * checking if atleast one of arguments includes in flags array
 *
 * @return Boolean
 */
function hasFlag(...flagNames) {
	return flagNames.some(flagName => process.argv.includes('--' + flagName))
}

/**
 * determines if app running in specified mode
 *
 * @return Boolean
 */
function isEnv(envArray) {
	return envArray.indexOf(process.env['NODE_ENV']) >= 0 || hasFlag(...envArray)
}

module.exports.hasFlag = hasFlag

module.exports.isProd = () => isEnv(['prod', 'production'])
module.exports.isDev = () => isEnv(['dev', 'development'])
module.exports.isTest = () => isEnv(['test', 'testing'])
