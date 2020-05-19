package com.dineshkb.gnu.controller

import java.lang

import com.dineshkb.gnu.assembler.TagResourceAssembler
import com.dineshkb.gnu.model.{ConfigurationItem, Tag}
import com.dineshkb.gnu.service.{ConfigurationItemService, TagService}
import javax.validation.Valid
import org.springframework.hateoas.{CollectionModel, EntityModel}
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping(path = Array("/api"))
class TagController(val tagService: TagService,
                    val itemService: ConfigurationItemService,
                    val tagResourceAssembler: TagResourceAssembler) {

  @GetMapping(path = Array("/tags"))
  def getTags(@RequestParam(required = false) status: String): ResponseEntity[CollectionModel[EntityModel[Tag]]] = {
    new ResponseEntity(tagResourceAssembler.toCollectionModel(tagService.getTags(status)), HttpStatus.OK)
  }

  @GetMapping(path = Array("/tags/{tagNo}"))
  def getTag(@PathVariable tagNo: String): ResponseEntity[EntityModel[Tag]] = {
    val tag = tagService.getTag(tagNo)
             .orElseThrow (() =>
              new ResponseStatusException(HttpStatus.NOT_FOUND, "%s tag not found".format(tagNo)))
    new ResponseEntity(tagResourceAssembler.toModel(tag), HttpStatus.OK)
  }

  @PutMapping(path = Array("/tags/{tagNo}"))
  def updateTag(@PathVariable tagNo: String,
                @Valid @RequestBody tag: Tag): ResponseEntity[String] = {
    if (tag.no != tagNo)
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
        "tag number in request body (%s) does not match the one in uri (%s)"
        .format(tag.no, tagNo))

    if (tagService.getTag(tagNo).isEmpty)
      new ResponseEntity(tagService.saveTag(tag), HttpStatus.CREATED)
    else
      new ResponseEntity(tagService.saveTag(tag), HttpStatus.OK)
  }

  @GetMapping(path = Array("/tags/{tagNo}/configurationitems"))
  def getItemsWithTag(@PathVariable tagNo: lang.String): ResponseEntity[lang.Iterable[ConfigurationItem]] =
    new ResponseEntity(itemService.getItemsWithTag(tagNo), HttpStatus.OK)

  @PatchMapping(path = Array("/tags/{tagNo}/configurationitems"))
  def updateTagNo(@PathVariable tagNo: lang.String,
                  @Valid @RequestBody pair: java.util.Map[java.lang.Long, String]): ResponseEntity[lang.Iterable[ConfigurationItem]] = {
    new ResponseEntity(itemService.updateTagNo(pair), HttpStatus.OK)
  }
}
