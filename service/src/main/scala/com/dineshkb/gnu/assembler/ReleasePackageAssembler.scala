package com.dineshkb.gnu.assembler

import com.dineshkb.gnu.controller.{ConfigurationItemController, ReleasePackageController, TagController}
import com.dineshkb.gnu.model.ReleasePackage
import org.springframework.hateoas.server.SimpleRepresentationModelAssembler
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder._
import org.springframework.hateoas.{CollectionModel, EntityModel}
import org.springframework.stereotype.Component


@Component
class ReleasePackageAssembler extends SimpleRepresentationModelAssembler[ReleasePackage] {

  override def addLinks(resource: EntityModel[ReleasePackage]): Unit = {
    resource.add(linkTo(methodOn(classOf[ReleasePackageController]).getPackage(resource.getContent.id)).withRel("self"))
    resource.add(linkTo(methodOn(classOf[TagController]).getTag(resource.getContent.tag.no)).withRel("tag"))
    resource.add(linkTo(methodOn(classOf[ConfigurationItemController]).getItemsWithTag(resource.getContent.tag.no)).withRel("configurationitems"))
  }

  override def addLinks(resources: CollectionModel[EntityModel[ReleasePackage]]): Unit = {
    resources.add(linkTo(methodOn(classOf[ReleasePackageController]).getPackages()).withRel("self"))
  }
}
