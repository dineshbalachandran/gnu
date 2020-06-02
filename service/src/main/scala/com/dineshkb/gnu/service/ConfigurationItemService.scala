package com.dineshkb.gnu.service

import java.{lang, util}

import com.dineshkb.gnu.model.{ConfigurationItem, Tag}
import com.dineshkb.gnu.repository.ConfigurationItemRepository
import org.springframework.stereotype.Service

@Service
class ConfigurationItemService(private val itemRepository: ConfigurationItemRepository,
                               private val tagService: TagService) {

  def getItemsWithTag(tagNo: String): lang.Iterable[ConfigurationItem] = itemRepository.findByTagNo(tagNo)

  def getItems(itemNos: lang.Iterable[lang.Long]) : lang.Iterable[ConfigurationItem] = itemRepository.findAllById(itemNos)

  def updateItems(items: lang.Iterable[ConfigurationItem]): lang.Iterable[ConfigurationItem] = itemRepository.saveAll(items)

  def updateTagNo(pair: util.Map[lang.Long, String]) : lang.Iterable[ConfigurationItem] = {
    val tagNos = new util.HashSet[String](pair.values)
    val tags  = getTags(tagNos)

    //TODO: introduce specific exception classes
    if (!tags.keySet.containsAll(tagNos))
      throw new Exception("Some tag nos not valid. Tag nos provided: %s, tag nos available: %s".format(tags.keySet, tagNos))

    //TODO: validation to check if all configuration items are present
    val cItems = getItems(pair.keySet)
    cItems.forEach(cItem => cItem.tag = tags.get(pair.get(cItem.id)))
    updateItems(cItems)
  }

  private def getTags(tagNos: util.Set[String]): util.Map[String, Tag] = {
    val tags = new util.HashMap[String, Tag]
    tagService.getTags(tagNos).forEach(tag => {
      tags.put(tag.no, tag)
    })
    tags
  }
}
