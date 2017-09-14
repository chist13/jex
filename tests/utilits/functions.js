const fs = require('fs')
const path = require('path')

global.resolveMocks = function resolveMocks(file = '') {
	return path.resolve(process.cwd(), 'tests/mocks', file)
}

global.waitForFile = function waitForFile(file, cb) {
	const filePath = resolveMocks(file)

	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath)
	}

	setInterval(() => {
		if (fs.existsSync(filePath)) {
			fs.readFile(filePath, 'utf-8', (err, data) => {
				if (err) {
					throw new Error(err)
				}

				cb(data)
			})
		}
	}, 100)
}