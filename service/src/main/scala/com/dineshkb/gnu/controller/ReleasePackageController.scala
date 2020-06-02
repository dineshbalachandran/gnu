package com.dineshkb.gnu.controller

import java.lang

import com.dineshkb.gnu.assembler.ReleasePackageAssembler
import com.dineshkb.gnu.dto.{ReleasePackageExportDTO, ReleasePackageImportDTO}
import com.dineshkb.gnu.model.ReleasePackage
import com.dineshkb.gnu.service.{ConfigurationItemService, ReleasePackageService}
import javax.validation.Valid
import org.springframework.hateoas.{CollectionModel, EntityModel}
import org.springframework.http.client.support.BasicAuthenticationInterceptor
import org.springframework.http.{HttpStatus, ResponseEntity}
import org.springframework.web.bind.annotation._
import org.springframework.web.client.RestTemplate
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
      releasePackage.id = null
      new ResponseEntity(releasePackageAssembler.toModel(releasePackageService.createPackage(releasePackage)),
          HttpStatus.CREATED)
  }

  @PutMapping(path = Array("/releasepackages/{id}"))
  def updatePackage(@Valid @RequestBody releasePackage: ReleasePackage): ResponseEntity[EntityModel[ReleasePackage]] = {
    new ResponseEntity(releasePackageAssembler.toModel(releasePackageService.updatePackage(releasePackage)),
        HttpStatus.OK)
  }

  @PostMapping(path = Array("/releasepackages/import"))
  def importPackage(@Valid @RequestBody importDTO: ReleasePackageImportDTO): ResponseEntity[lang.Long] = {
    new ResponseEntity(releasePackageService.importPackage(importDTO.releasePackage, importDTO.cItems), HttpStatus.CREATED)
  }

  @PostMapping(path = Array("/releasepackages/export"))
  def exportPackage(@Valid @RequestBody exportDTO: ReleasePackageExportDTO): ResponseEntity[lang.Long] = {
    val releasePackage = releasePackageService.getPackage(exportDTO.releasePackageNo)
                         .orElseThrow (() =>
                         new ResponseStatusException(HttpStatus.NOT_FOUND, "%s package not found".format(exportDTO.releasePackageNo)))

    val cItems = configurationItemService.getItemsWithTag(releasePackage.tag.no)
    val importDTO = new ReleasePackageImportDTO
    importDTO.releasePackage = releasePackage
    importDTO.releasePackage.id = null
    importDTO.cItems = cItems

    val restTemplate = new RestTemplate()
    restTemplate.getInterceptors.add(new BasicAuthenticationInterceptor("user", "password"))
    val result = restTemplate.postForObject(exportDTO.destination, importDTO, classOf[java.lang.Long])

    new ResponseEntity(result, HttpStatus.OK)
  }
}
