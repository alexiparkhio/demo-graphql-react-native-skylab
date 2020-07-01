module.exports = class UnauthorizedError extends Error {
	constructor(...args) {
		super(...args);

		this.name = UnauthorizedError.name;
	}
};