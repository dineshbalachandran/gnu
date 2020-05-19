package com.dineshkb.gnu.service

import java.util.Optional

import com.dineshkb.gnu.model.Tag
import com.dineshkb.gnu.repository.TagRepository
import org.springframework.stereotype.Service

@Service
class TagService( private val tagRepository: TagRepository) {

   def getTags(status: String): java.lang.Iterable[Tag] =
     status match {
       case null => tagRepository.findAll()
       case _ => tagRepository.findAllByStatus(status)
     }

  def getTags(tagNos: java.lang.Iterable[String]) : java.lang.Iterable[Tag] = tagRepository.findAllById(tagNos)

  def getTag(number: java.lang.String): Optional[Tag] = tagRepository.findById(number)

  def saveTag(t: Tag): java.lang.String = {
    tagRepository.save(t)
    t.no
  }
}
