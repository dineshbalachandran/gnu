package com.dineshkb.gnu.dto

import javax.validation.constraints.NotNull

import scala.beans.BeanProperty

class ReleasePackageExportDTO {
  @BeanProperty @NotNull
  var destination: String = _
  @BeanProperty
  var releasePackageNo: java.lang.Long = _
}
