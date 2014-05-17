source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.4'


gem 'rails-api'

# Use sqlite3 as the database for Active Record
gem 'pg'

group :development do
  gem 'pry-rails'
  gem 'guard'
  gem 'guard-rspec', '>= 4.2.7', require: false
  gem 'guard-spork'
  gem 'spork', '1.0.0rc4' #1.0 is required for rails 4, upgrade this when the final comes out
end

group :test do
  gem 'simplecov', require: false
end

group :development, :test do
  gem 'rspec', '~> 3.0.0.beta'
  gem 'rspec-rails', '~> 3.0.0.beta'
  gem 'factory_girl_rails'
end

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano', :group => :development

