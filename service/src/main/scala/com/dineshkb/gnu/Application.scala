package com.dineshkb.gnu

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration

@SpringBootApplication(exclude = Array(classOf[SecurityAutoConfiguration]))
class Application

object Application extends App {
  SpringApplication.run(classOf[Application])
}
