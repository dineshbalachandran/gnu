package com.dineshkb.gnu.config

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.{EnableWebSecurity, WebSecurityConfigurerAdapter}

@Configuration
@EnableWebSecurity class BasicConfiguration extends WebSecurityConfigurerAdapter {
  @throws[Exception]
  override protected def configure(auth: AuthenticationManagerBuilder): Unit = {
    auth
      .inMemoryAuthentication
      .withUser("user")
      .password("{noop}password")
      .roles("USER")
      .and
      .withUser("admin")
      .password("{noop}admin")
      .roles("USER", "ADMIN", "ACTUATOR")
  }

  @throws[Exception]
  override protected def configure(http: HttpSecurity): Unit = {
    http.authorizeRequests.antMatchers("/h2-console", "/h2-console/**", "/console/", "/swagger-ui.html", "/**/*.css", "/**/*.js", "/**/*.png", "/configuration/**", "/swagger-resources", "/v2/**", "/shutdown").permitAll

    http
      .authorizeRequests
      .anyRequest
      .authenticated
      .and
      .httpBasic
    http.headers.frameOptions.disable
    http.csrf.disable
  }
}
