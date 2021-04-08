class ApplicationController < ActionController::API
    def html
        render file: 'public/index.html'
    end

    def query
        results = ActiveRecord::Base.connection.exec_query("
            #{params[:query]}
        ")

        render json: results
    end
end
