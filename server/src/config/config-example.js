module.exports = {
  port: 3000,
  db: {
    url: 'mongodb://localhost:27017/<dbname>',
    opt: {}
  },
	authentication: {
		jwtSecret: process.env.JWT_SECRET || 'secret'
	}
}
