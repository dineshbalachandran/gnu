package com.dineshkb.gnu.service

import java.lang
import java.util.Optional

import com.dineshkb.gnu.model.{ConfigurationItem, ReleasePackage}
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

  def createPackage(releasePackage: ReleasePackage): java.lang.Long = {
    val tagNo = releasePackage.tag.no

    //TODO: raise specific exception
    val tag = tagService.getTag(tagNo).orElseThrow(() => {
      new Exception("%s tag not found".format(tagNo))
    })
    tag.status = "closed"
    tagService.saveTag(tag)

    releasePackage.tag = tag
    releasePackageRepository.save(releasePackage)
    releasePackage.no
  }

  def importPackage(releasePackage: ReleasePackage, cItems: java.lang.Iterable[ConfigurationItem]): lang.Long = {
    tagService.saveTag(releasePackage.tag)
    releasePackageRepository.save(releasePackage)
    itemsService.updateItems(cItems)
    releasePackage.no
  }
}
