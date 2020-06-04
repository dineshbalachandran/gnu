package com.dineshkb.gnu.service

import java.util.Optional

import com.dineshkb.gnu.model.{ConfigurationItem, ReleasePackage, Tag}
import com.dineshkb.gnu.repository.ReleasePackageRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import scala.collection.JavaConverters._
import scala.collection.mutable.ListBuffer

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
    releasePackage.id = null
    releasePackageRepository.save(releasePackage)
    releasePackage
  }

  def updatePackage(releasePackage: ReleasePackage): ReleasePackage = {
    //TODO: validate that the tagno has not changed
    //TODO: check that the package id already exists

    releasePackageRepository.save(releasePackage)
    releasePackage
  }

  def importPackages(releasePackages: java.lang.Iterable[ReleasePackage]): java.lang.Iterable[ReleasePackage] = {
    var importedPackages = ListBuffer[ReleasePackage]()

    releasePackages.forEach(releasePackage => {
      releasePackage.status = "Importing"
      importedPackages += createPackage(releasePackage)
    })

    importedPackages.asJava
  }

  def rePack(no: String, configItemIds: java.lang.Iterable[java.lang.Long]): java.lang.Iterable[ConfigurationItem] = {
    var currentItemIds = ListBuffer[java.lang.Long]()
    itemsService.getItemsWithTag(no).forEach(item => currentItemIds += item.id)

    itemsService.updateTagNo("0.0.0", currentItemIds.asJava)
    itemsService.updateTagNo(no, configItemIds)
  }
}
