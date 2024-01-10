FROM openjdk:23-slim-bullseye
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN javac hello.java
CMD ["java", "hello"]
