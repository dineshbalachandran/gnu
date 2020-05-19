package com.dineshkb.gnu.repository

import com.dineshkb.gnu.model.Tag
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
trait TagRepository extends CrudRepository[Tag, java.lang.String] {
  def findAllByStatus(status: String) : java.lang.Iterable[Tag]
}
