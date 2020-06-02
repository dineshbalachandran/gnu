package com.dineshkb.gnu.service

import java.lang
import java.util.Optional

import com.dineshkb.gnu.model.{ConfigurationItem, ReleasePackage, Tag}
import com.dineshkb.gnu.repository.ReleasePackageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class ReleasePackageService( val releasePackageRepository: ReleasePackageRepository,
                             val itemsService: ConfigurationItemService,
                             val tagService: TagService ) {

  def getPackages(): java.lang.Iterable[ReleasePackage] = releasePackageRepository.findAll()

  def getPackage(no: java.lang.Long): Optional[ReleasePackage] = releasePackageRepository.findById(no)

  def createPackage(releasePackage: ReleasePackage): ReleasePackage = {
    val tagNo = releasePackage.tag.no

    //TODO: raise specific exception
    tagService.getTag(tagNo).ifPresent(_ => {
      new Exception("Tag %s already used".format(tagNo))
    })

    val tag = new Tag()
    tag.no = tagNo
    tag.description = "Package tag"

    tagService.saveTag(tag)

    releasePackage.tag = tag
    releasePackageRepository.save(releasePackage)
    releasePackage
  }

  def updatePackage(releasePackage: ReleasePackage): ReleasePackage = {
    //TODO: validate that the tagno has not changed
    //TODO: check that the package id already exists

    releasePackageRepository.save(releasePackage)
    releasePackage
  }

  def importPackage(releasePackage: ReleasePackage, cItems: java.lang.Iterable[ConfigurationItem]): lang.Long = {
    tagService.saveTag(releasePackage.tag)
    releasePackageRepository.save(releasePackage)
    itemsService.updateItems(cItems)
    releasePackage.id
  }
}
