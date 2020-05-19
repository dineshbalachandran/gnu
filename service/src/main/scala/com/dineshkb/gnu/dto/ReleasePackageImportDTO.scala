package com.dineshkb.gnu.dto

import com.dineshkb.gnu.model.{ConfigurationItem, ReleasePackage}
import javax.validation.constraints.NotNull

import scala.beans.BeanProperty

class ReleasePackageImportDTO {
  @BeanProperty @NotNull
  var releasePackage: ReleasePackage = _
  @BeanProperty
  var cItems: java.lang.Iterable[ConfigurationItem] = _
}
