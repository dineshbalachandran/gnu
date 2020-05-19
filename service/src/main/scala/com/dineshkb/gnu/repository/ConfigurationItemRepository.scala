package com.dineshkb.gnu.repository

import com.dineshkb.gnu.model.ConfigurationItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
trait ConfigurationItemRepository extends CrudRepository[ConfigurationItem, java.lang.Long] {
  def findByTagNo(tagNo: String) : java.lang.Iterable[ConfigurationItem]
}
