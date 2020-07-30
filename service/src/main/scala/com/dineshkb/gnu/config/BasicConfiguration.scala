package com.dineshkb.gnu.config

import org.springframework.context.annotation.{Bean, Configuration}
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.{EnableWebSecurity, WebSecurityConfigurerAdapter}
import org.springframework.web.cors.{CorsConfiguration, CorsConfigurationSource, UrlBasedCorsConfigurationSource}

import scala.collection.JavaConverters._

@Configuration
@EnableWebSecurity
class BasicConfiguration extends WebSecurityConfigurerAdapter {


  @throws[Exception]
  override protected def configure(http: HttpSecurity): Unit = {
    http.authorizeRequests.antMatchers("/h2-console", "/h2-console/**", "/console/", "/swagger-ui.html", "/**/*.css", "/**/*.js", "/**/*.png", "/configuration/**", "/swagger-resources", "/v2/**", "/shutdown").permitAll

    http
      .cors
      .and
      .authorizeRequests
      .anyRequest
      .authenticated
      .and
      .oauth2ResourceServer
      .jwt
    http.headers.frameOptions.disable
    http.csrf.disable
  }

  @Bean
  def corsConfigurationSource : CorsConfigurationSource = {
    val configuration = new CorsConfiguration
    configuration.setAllowedOrigins(List("*").asJava)
    configuration.setAllowedMethods(List("*").asJava)
    configuration.setAllowedHeaders(List("authorization", "content-type", "x-auth-token").asJava)
    configuration.setExposedHeaders(List("x-auth-token").asJava)
    val source = new UrlBasedCorsConfigurationSource()
    source.registerCorsConfiguration("/**", configuration)
    source
  }
}
