package com.dineshkb.gnu.controller

import java.lang

import com.dineshkb.gnu.assembler.ReleasePackageAssembler
import com.dineshkb.gnu.model.{ConfigurationItem, ReleasePackage}
import com.dineshkb.gnu.service.{ConfigurationItemService, ReleasePackageService}
import javax.validation.Valid
import org.springframework.hateoas.{CollectionModel, EntityModel}
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping(path = Array("/api"))
class ReleasePackageController(val releasePackageService: ReleasePackageService,
                               val releasePackageAssembler: ReleasePackageAssembler,
                               val configurationItemService: ConfigurationItemService) {

  @GetMapping(path = Array("/releasepackages"))
  def getPackages(): ResponseEntity[CollectionModel[EntityModel[ReleasePackage]]] =
    new ResponseEntity(releasePackageAssembler.toCollectionModel(releasePackageService.getPackages) , HttpStatus.OK)

  @GetMapping(path = Array("/releasepackages/{id}"))
  def getPackage(@PathVariable id: lang.Long): ResponseEntity[EntityModel[ReleasePackage]] = {
    val releasePackage = releasePackageService.getPackage(id)
             .orElseThrow (() =>
              new ResponseStatusException(HttpStatus.NOT_FOUND, "%s package not found".format(id)))
    new ResponseEntity(releasePackageAssembler.toModel(releasePackage), HttpStatus.OK)
  }

  @PostMapping(path = Array("/releasepackages"))
  def createPackage(@Valid @RequestBody releasePackage: ReleasePackage): ResponseEntity[EntityModel[ReleasePackage]] = {
      new ResponseEntity(releasePackageAssembler.toModel(releasePackageService.createPackage(releasePackage)),
          HttpStatus.CREATED)
  }

  @PutMapping(path = Array("/releasepackages/{id}"))
  def updatePackage(@Valid @RequestBody releasePackage: ReleasePackage): ResponseEntity[EntityModel[ReleasePackage]] = {
    new ResponseEntity(releasePackageAssembler.toModel(releasePackageService.updatePackage(releasePackage)),
        HttpStatus.OK)
  }

  @PostMapping(path = Array("/releasepackages/import"))
  def importPackage(@Valid @RequestBody releasePackages: java.lang.Iterable[ReleasePackage]): ResponseEntity[CollectionModel[EntityModel[ReleasePackage]]] = {
    new ResponseEntity(releasePackageAssembler.toCollectionModel(releasePackageService.importPackages(releasePackages)), HttpStatus.CREATED)
  }

  //this method retained to demonstrate code to make a rest call, otherwise this is functionally incorrect and superseded
//  @Deprecated
//  @PostMapping(path = Array("/releasepackages/{id}/export"))
//  def exportPackage(@PathVariable id: lang.Long): ResponseEntity[lang.Long] = {
//    val releasePackage = releasePackageService.getPackage(id)
//                         .orElseThrow (() =>
//                         new ResponseStatusException(HttpStatus.NOT_FOUND, "%s package not found".format(id)))
//
//    val cItems = configurationItemService.getItemsWithTag(releasePackage.tag.no)
//
//    val restTemplate = new RestTemplate()
//    restTemplate.getInterceptors.add(new BasicAuthenticationInterceptor("user", "password"))
//    val result = restTemplate.postForObject("url", releasePackage, classOf[java.lang.Long])
//
//    new ResponseEntity(result, HttpStatus.OK)
//  }

  @PostMapping(path = Array("/releasepackages/repack"))
  def rePack(@RequestParam no: lang.String,
                  @Valid @RequestBody itemIds: java.lang.Iterable[java.lang.Long]): ResponseEntity[lang.Iterable[ConfigurationItem]] = {
    new ResponseEntity(releasePackageService.rePack(no, itemIds), HttpStatus.OK)
  }
}
