db_config = Rails.configuration.database_configuration

adapter = db_config[Rails.env]["adapter"]
database = db_config[Rails.env]["database"]

Rails.application.config.sequel_db_connection_info = {
  adapter: adapter,
  database: database
}
