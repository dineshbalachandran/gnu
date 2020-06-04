package com.dineshkb.gnu.controller

import java.lang

import com.dineshkb.gnu.model.ConfigurationItem
import com.dineshkb.gnu.service.ConfigurationItemService
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation.{GetMapping, RequestMapping, RequestParam, RestController}

@RestController
@RequestMapping(path = Array("/api"))
class ConfigurationItemController(val itemService: ConfigurationItemService) {

  @GetMapping(path = Array("/configurationitems"))
  def getItemsWithTag(@RequestParam no: lang.String): ResponseEntity[lang.Iterable[ConfigurationItem]] =
    new ResponseEntity(itemService.getItemsWithTag(no), HttpStatus.OK)

}
