Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get '*path', to: 'application#html', constraints: lambda { |request|
      !request.xhr? && request.format.html?
  }

  ## make a post request and query
  post '/query', to: 'application#query'
  post '/create', to: 'application#create'

end
