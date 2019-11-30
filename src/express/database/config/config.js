module.exports = {
	"development": {
		"url": "postgres://postgres:admin@127.0.0.1:5432/postgres?currentSchema=test",
		"dialect": "postgres"
	},
	"test": {
		"url": "postgres://postgres:admin@127.0.0.1:5432/postgres?currentSchema=test",
		"dialect": "postgres"
	},
	"production": {
		"url": "postgres://postgres:admin@127.0.0.1:5432/postgres?currentSchema=test",
		"dialect": "postgres"
	}
}
