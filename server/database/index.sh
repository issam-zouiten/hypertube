db-migrate db:drop hypertube --config ./config/database.json
db-migrate db:create hypertube --config ./config/database.json
db-migrate up --config ./config/dev.json