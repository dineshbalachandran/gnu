package com.dineshkb.gnu.assembler

import com.dineshkb.gnu.controller.TagController
import com.dineshkb.gnu.model.Tag
import org.springframework.hateoas.server.SimpleRepresentationModelAssembler
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder._
import org.springframework.hateoas.{CollectionModel, EntityModel}
import org.springframework.stereotype.Component


@Component
class TagResourceAssembler extends SimpleRepresentationModelAssembler[Tag] {

  override def addLinks(resource: EntityModel[Tag]): Unit = {
    resource.add(linkTo(methodOn(classOf[TagController]).getTag(resource.getContent.no)).withRel("self"))
    resource.add(linkTo(methodOn(classOf[TagController]).getItemsWithTag(resource.getContent.no)).withRel("configurationitems"))
  }

  override def addLinks(resources: CollectionModel[EntityModel[Tag]]): Unit = {
    resources.add(linkTo(methodOn(classOf[TagController]).getTags(null)).withRel("self"))
  }
}
