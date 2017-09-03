module.exports = {
	name: ['pug', 'jade'],

	handler() {
		return this.task(null, () => {}, 'pug')
	}

}
