FROM ruby:latest

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

# Set executable permission
RUN chmod +x hello.rb

CMD [ "ruby","./hello.rb" ]
