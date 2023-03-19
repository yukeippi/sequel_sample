class ApplicationController < ActionController::Base
  def connection_info
    Rails.application.config.sequel_db_connection_info
  end
end
