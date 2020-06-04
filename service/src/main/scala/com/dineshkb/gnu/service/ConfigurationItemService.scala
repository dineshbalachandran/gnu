package com.dineshkb.gnu.service

import java.lang

import com.dineshkb.gnu.model.ConfigurationItem
import com.dineshkb.gnu.repository.ConfigurationItemRepository
import org.springframework.stereotype.Service

@Service
class ConfigurationItemService(private val itemRepository: ConfigurationItemRepository,
                               private val tagService: TagService) {

  def getItemsWithTag(tagNo: String): lang.Iterable[ConfigurationItem] = itemRepository.findByTagNo(tagNo)

  def getItems(itemNos: lang.Iterable[lang.Long]) : lang.Iterable[ConfigurationItem] = itemRepository.findAllById(itemNos)

  def updateItems(items: lang.Iterable[ConfigurationItem]): lang.Iterable[ConfigurationItem] = itemRepository.saveAll(items)

  def updateTagNo(tagNo: String, itemIds: lang.Iterable[lang.Long]) : lang.Iterable[ConfigurationItem] = {

    //TODO: introduce specific exception classes
    val tag = tagService.getTag(tagNo).orElseThrow(() =>
        throw new Exception("Tag no provided %s is not present.".format(tagNo)))

    //TODO: validation to check if all configuration items are present
    val cItems = getItems(itemIds)
    cItems.forEach(cItem => cItem.tag = tag)
    updateItems(cItems)
  }

}
