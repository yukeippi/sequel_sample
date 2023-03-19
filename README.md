# 作り方

```
rails new sequel_sample -d postgresql
cd sequel_sample
rails db:create; rails db:migrate
git add .
git commit -m "First commit"

rails g scaffold user name
rails db:migrate
git add .
git commit -m "Add user model"

bundle add sequel
```

```
vim config/initializers/sequel.rb
db_config = Rails.configuration.database_configuration

adapter = db_config[Rails.env]["adapter"]
database = db_config[Rails.env]["database"]

Rails.application.config.sequel_db_connection_info = {
  adapter: adapter,
  database: database
}
```

```
vim app/controllers/application_controller.rb
def connection_info
  Rails.application.config.sequel_db_connection_info
end
```

```
vim app/controllers/users_controller.rb
def download
  db = Sequel.connect(connection_info)
  sql = "SELECT * FROM USERS"
  result = db[sql].all
  # to_jsonしてjsonでクライアントに戻す
end
```
