package com.dineshkb.gnu.controller

import com.dineshkb.gnu.assembler.TagResourceAssembler
import com.dineshkb.gnu.model.Tag
import com.dineshkb.gnu.service.TagService
import javax.validation.Valid
import org.springframework.hateoas.{CollectionModel, EntityModel}
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping(path = Array("/api"))
class TagController(val tagService: TagService,
                    val tagResourceAssembler: TagResourceAssembler) {

  @GetMapping(path = Array("/tags"))
  def getTags(): ResponseEntity[CollectionModel[EntityModel[Tag]]] = {
    new ResponseEntity(tagResourceAssembler.toCollectionModel(tagService.getTags()), HttpStatus.OK)
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

}
