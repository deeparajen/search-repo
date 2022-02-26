Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'repository/search' => 'repository#search'
    end
  end

  root 'repository#index'
end
